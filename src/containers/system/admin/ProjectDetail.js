import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../../store/actions/project";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import {
  apiGetProjectProgress,
  apiPostProjectProgress,
} from "../../../services";

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
    projectId: projectId,
  });
  const [progress, setProgress] = useState([]);
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

  const project = projects.find((project) => project.id === projectId);
  const handleInputChange = (e) => {
    setPlayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    try {
      const response = await apiPostProjectProgress(payload);
      console.log(response)
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
  return (
    <div class="bg-gray-100 p-4">
      <div class="border-1 shadow-lg shadow-gray-700 rounded-lg">
        <div class="flex rounded-t-lg bg-top-color sm:px-2 w-full">
          <div class="w-full font-bold text-3xl sm:text-center py-5 mt-10 text-center">
            {project.name}
          </div>
        </div>

        <div class="p-5">
          <div class="flex flex-col sm:flex-row sm:mt-10">
            <div class="flex flex-col sm:w-1/3">
              <div class="py-3 sm:order-none order-1">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Khách hàng
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>

                <div>
                  <div class="flex items-center my-1">
                    <div class="">{project.customer.name}</div>
                  </div>
                  <div class="flex items-center my-1">
                    <div>{project.customer.email}</div>
                  </div>
                  <div class="flex items-center my-1">
                    <div>{project.customer.phone}</div>
                  </div>
                  <div class="flex items-center my-1">
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="py-3 sm:order-none order-2">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Partner
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>
                <div>
                  <div class="flex items-center my-1">
                    <div>{project.user.name}</div>
                  </div>
                  <div class="flex items-center my-1">
                    <div>{project.user.email}</div>
                  </div>
                  <div class="flex items-center my-1">
                    <div>{project.user.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:w-2/3 order-last sm:order-none sm:-mt-10">
              <div class="py-3">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Mô tả
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>
                <p>{project.description}</p>
              </div>

              <div class="py-3">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Chi phí
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>
                <div class="flex flex-col">
                  <div class="flex flex-row">
                    <p class="pr-5">Dự kiến:</p>
                    <p class="">{project.expectedRevenue}</p>
                  </div>
                  <div class="flex flex-row">
                    <p class="pr-5">Thực lãnh:</p>
                    <p class="">{project.actualRevenue}</p>
                  </div>
                </div>
              </div>
              <div class="py-3">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Ngày nhận thông tin dự án
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>
                <p>{format(new Date(project.createdAt), "dd/MM/yyyy")}</p>
              </div>
              <div class="py-3">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Tiến độ dự án
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>
                <div class="flex flex-col">
                  {progress ? (
                    <>
                      {progress
                        .sort(
                          (a, b) =>
                            new Date(a.updateDate) - new Date(b.updateDate)
                        )
                        .map((item) => (
                          <div class="flex flex-row" key={item.id}>
                            <p class="pr-5">
                              {format(new Date(item.updateDate), "dd/MM/yyyy")}
                            </p>
                            <p class="">{item.currentStage}</p>
                          </div>
                        ))}
                    </>
                  ) : (
                    <p>Không có thông tin tiến độ dự án.</p>
                  )}
                </div>
              </div>
              <div class="py-3">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Cập nhật tiến độ dự án
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>
                <div class="flex flex-col">
                  <div class="flex flex-col md:flex-row">
                    <div class="flex flex-col pr-5">
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
                    <div class="flex flex-col pr-5">
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
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-500 mt-6 text-white p-2 rounded-md"
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
