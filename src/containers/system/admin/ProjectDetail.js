import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../../store/actions/project";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import {
  apiEditProject,
  apiGetProjectProgress,
  apiPostDiscount,
  apiPostProjectProgress,
} from "../../../services";
import ReferralBonuses from "./ReferralBonuses";

const ProjectDetail = () => {
  const { currentData } = useSelector((state) => state.user);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get("projectId");
  const { projects } = useSelector((state) => state.allProjects);
  const dispatch = useDispatch();
  const [payload, setPlayload] = useState({
    currentStage: "",
    updateDate: "",
    actualRevenue: "",
    projectId: projectId,
  });
  const [progress, setProgress] = useState([]);

  const project = projects.find((project) => project.id === projectId);
  const [actualRevenue, setActualRevenue] = useState(
    project ? project.actualRevenue : ""
  );
  const handleInputChange = (e) => {
    setPlayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSuccess = async () => {
    try {
      await apiEditProject({
        id: projectId,
        status: "Thành Công",
      });
      await apiPostDiscount({ projectId: projectId });

      dispatch(getAllProjects());
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  };
  const handleSubmitActualRevenue = async () => {
    await apiEditProject({
      id: projectId,
      actualRevenue: actualRevenue,
    });
    console.log(actualRevenue);
  };
  const handleSubmit = async () => {
    try {
      const response = await apiPostProjectProgress(payload);
      console.log(response);
      if (response.data.err === 0) {
        const newProgress = {
          ...response.data.progress,
          updateDate: payload.updateDate,
          currentStage: payload.currentStage,
        };
        // Cập nhật state progress với thông tin mới
        setProgress([...progress, newProgress]);
        console.log(progress);
        // Reset giá trị trong payload để sẵn sàng cho cập nhật tiếp theo
        setPlayload({
          currentStage: "",
          updateDate: "",
          projectId: projectId,
        });
        console.log(payload);
      } else {
        console.log("Cập nhật không thành công:", response.data.message);
      }
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  };
  console.log(progress);
  useEffect(() => {
    if (!currentData || !currentData.id) {
      console.log(currentData.id);
      window.location.href = "/login";
    }
  }, [currentData]);
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressResponse = await apiGetProjectProgress(projectId);
        setProgress(progressResponse.data.response || []);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    fetchProgress();
  }, [projectId]);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 flex flex-col gap-4 p-4">
      <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">
        <div className="flex rounded-t-lg bg-top-color sm:px-2 w-full ">
          <div className="w-full font-bold text-3xl sm:text-center py-5 mt-10 text-center">
            <div className="">{project?.name}</div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex flex-col sm:flex-row sm:mt-10">
            <div className="flex flex-col sm:w-1/3">
              <div className="py-3 sm:order-none order-1">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Khách hàng
                </h2>
                <div className="border-2 w-20 border-top-color my-2"></div>

                <div>
                  <div className="flex items-center my-1">
                    <div className="">{project?.customer?.name}</div>
                  </div>
                  <div className="flex items-center my-1">
                    <div>{project?.customer?.email}</div>
                  </div>
                  <div className="flex items-center my-1">
                    <div>{project?.customer?.phone}</div>
                  </div>
                  <div className="flex items-center my-1">
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="py-3 sm:order-none order-2">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Partner
                </h2>
                <div className="border-2 w-20 border-top-color my-2"></div>
                <div>
                  <div className="flex items-center my-1">
                    <div>{project?.user?.name}</div>
                  </div>
                  <div className="flex items-center my-1">
                    <div>{project?.user?.email}</div>
                  </div>
                  <div className="flex items-center my-1">
                    <div>{project?.user?.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:w-2/3 order-last sm:order-none sm:-mt-10">
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Mô tả
                </h2>
                <div className="border-2 w-20 border-top-color my-2"></div>
                <p>{project?.description}</p>
              </div>
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Chi phí
                </h2>
                <div className="border-2 w-20 border-top-color my-2"></div>
                <div className="flex flex-col">
                  <div className="flex flex-row gap-4">
                    <p className="w-20">Dự kiến:</p>
                    <p className="">{project?.expectedRevenue}</p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <label className="w-20 my-auto">Thực lãnh:</label>
                    <input
                      type="text"
                      name="currentStage"
                      value={actualRevenue}
                      onChange={(e) => {
                        setActualRevenue(e.target.value);
                      }}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={handleSubmitActualRevenue}
                      className="bg-blue-500 my-auto text-white p-2 rounded-md"
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Ngày nhận thông tin dự án
                </h2>
                <div className="border-2 w-20 border-top-color my-2"></div>
                <p>
                  {project?.createdAt &&
                    format(new Date(project.createdAt), "dd/MM/yyyy")}
                </p>
              </div>
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Tiến độ dự án
                </h2>
                <div className="border-2 w-20 border-top-color my-2"></div>
                <div className="flex flex-col">
                  {progress ? (
                    <>
                      {progress
                        .sort(
                          (a, b) =>
                            new Date(a.updateDate) - new Date(b.updateDate)
                        )
                        .map((item) => (
                          <div className="flex flex-row" key={item.id}>
                            <p className="pr-5">
                              {format(new Date(item.updateDate), "dd/MM/yyyy")}
                            </p>
                            <p className="">{item.currentStage}</p>
                          </div>
                        ))}
                    </>
                  ) : (
                    <p>Không có thông tin tiến độ dự án.</p>
                  )}
                </div>
              </div>
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Cập nhật tiến độ dự án
                </h2>
                <div className="border-2 w-20 border-top-color my-2"></div>
                <div className="flex flex-col">
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-col pr-5">
                      <label className="block text-sm font-medium text-gray-700">
                        Ngày thực hiện
                      </label>
                      <input
                        type="date"
                        name="updateDate"
                        value={payload.updateDate}
                        onChange={handleInputChange}
                        className="w-52 mt-1 p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex flex-col pr-5">
                      <label className="block text-sm font-medium text-gray-700">
                        Nội dung thực hiện
                      </label>
                      <input
                        type="text"
                        name="currentStage"
                        value={payload.currentStage}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    {project?.status !== "Thành Công" && (
                      <div className="flex flex-row gap-2">
                        <button
                          onClick={handleSubmit}
                          className="bg-blue-500 mt-6 text-white p-2 rounded-md"
                        >
                          Cập nhật
                        </button>
                        <button
                          onClick={handleSuccess}
                          className="bg-blue-500 mt-6 text-white p-2 rounded-md"
                          disabled={project?.status === "Thành Công"}
                        >
                          Hoàn thành
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {project?.status === "Thành Công" && (
        <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">
          <ReferralBonuses project={project} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
