import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../../store/actions/project";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  apiEditProject,
  apiGetProjectProgress,
  apiPostDiscount,
  apiPostProjectProgress,
} from "../../../services";
import ReferralBonuses from "./ReferralBonuses";
import { formatCurrency } from "../../../ultils/formatCurrency";
import { Modal, Button, Input, DatePicker } from "antd";

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
  const navigate = useNavigate();

  const [actualRevenue, setActualRevenue] = useState(
    project ? project.actualRevenue : ""
  );
  // hiện thị modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleUpdateProgress = () => {
    setIsModalVisible(true);
  };
  const handleSuccess = async () => {
    // Đóng Modal sau khi cập nhật thành công
    setIsModalVisible(false);
    navigate(`/he-thong/ds-du-an`);
    try {
      await apiEditProject({
        id: projectId,
        // status: "Chưa giải quyết",
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
    // console.log(actualRevenue);
  };
  const handleSubmit = async () => {
    if (!payload.updateDate || !payload.currentStage.trim()) {
      alert("Vui lòng chọn ngày và nhập nội dung thực hiện");
      return;
    }
    try {
       await apiEditProject({
         id: projectId,
         // status: "Chưa giải quyết",
         status: "Đang triển khai",
       });
      const response = await apiPostProjectProgress(payload);
      if (response.data.err === 0) {
        const newProgress = {
          ...response.data.progress,
          updateDate: payload.updateDate,
          currentStage: payload.currentStage,
        };
        setProgress([...progress, newProgress]);
        // Đóng Modal sau khi cập nhật thành công
        setIsModalVisible(false);
        // Reset payload nếu cần
        setPlayload({
          currentStage: "",
          updateDate: "",
          projectId: projectId,
        });
      } else {
        console.log("Cập nhật không thành công:", response.data.message);
      }
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  };
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
  console.log(progress);
  return (
    <div className="bg-white flex flex-col gap-4 p-4">
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
                    <p className="">
                      {formatCurrency(project?.expectedRevenue)} vnđ
                    </p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <label className="w-20 my-auto">Thực lãnh:</label>
                    <input
                      type="text"
                      name="currentStage"
                      value={formatCurrency(actualRevenue)}
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
                  {progress && progress.length > 0 ? (
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
                  <button
                    onClick={handleUpdateProgress}
                    className="bg-blue-500 my-auto w-48 text-white p-2 rounded-md"
                    disabled={project?.status === "Thành Công"}
                  >
                    Cập nhật tiến độ dự án
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Cập nhật tiến độ dự án"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            className="bg-blue-500"
            key="submit"
            type="primary"
            onClick={handleSubmit}
          >
            Cập nhật
          </Button>,
          <Button
            className="bg-blue-500"
            key="complete"
            type="primary"
            onClick={handleSuccess}
          >
            Hoàn thành
          </Button>,
        ]}
      >
        <div>
          <label>Ngày thực hiện:</label>
          <DatePicker
            format="YYYY-MM-DD"
            value={
              payload.updateDate
                ? moment(payload.updateDate, "YYYY-MM-DD")
                : null
            }
            onChange={(date, dateString) =>
              setPlayload({ ...payload, updateDate: dateString })
            }
          />
        </div>
        <div>
          <label>Nội dung thực hiện:</label>
          <Input
            value={payload.currentStage}
            onChange={(e) =>
              setPlayload({ ...payload, currentStage: e.target.value })
            }
          />
        </div>
      </Modal>
      {project?.status === "Thành Công" && (
        <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">
          <ReferralBonuses project={project} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
