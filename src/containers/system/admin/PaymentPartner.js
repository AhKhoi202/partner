import React, { useEffect, useState, useCallback } from "react";
import {
  apiGetPaymentStages,
  apiCreatePaymentStages,
  apiDeletePaymentStages,
  apiUpdatePaymentStages,
} from "../../../services/payment";
import { apiGetDiscountById } from "../../../services/project";
import { Button as Button1 } from "../../../components";
import { Table, Button, Popconfirm, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import Swal from "sweetalert2";
import { formatCurrency } from "../../../ultils/formatCurrency";

const PaymentPartner = () => {
  const [paymentStages, setPaymentStages] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [stageName, setStageName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [referralBonusesId, setReferralBonusesId] = useState("");
  const [existingStageNames, setExistingStageNames] = useState([]);
  const [discountData, setDiscountData] = useState(null);
  const [isInputEditable, setIsInputEditable] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(null);
  const [imageData, setImageData] = useState(null);

  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [imageViewerSrc, setImageViewerSrc] = useState("");

  //lấy id từ link
  useEffect(() => {
    const url = window.location.href;
    const id = url.split("?")[1];
    setReferralBonusesId(id);
  }, []);

  //lấy thông tin chiết khấu của partner
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetDiscountById(referralBonusesId);
        setDiscountData(response.data.response);
        console.log(discountData);
        console.log(response);
      } catch (error) {
        console.error("Error fetching discount:", error);
      }
    };
    fetchData();
  }, [referralBonusesId, discountData]);
  useEffect(() => {
    //kiểm tra và cập nhật totalAmount và isInputEditable
    let totalPaid = 0;
    if (paymentStages) {
      totalPaid = paymentStages.reduce((acc, stage) => acc + stage.paid, 0);
    }
    const remainingAmount = discountData?.[0]?.totalAmount - totalPaid;
    if (remainingAmount <= 1000000) {
      setTotalAmount(remainingAmount);
      setIsInputEditable(false); // Không cho phép chỉnh sửa nếu điều kiện đúng
    } else {
      setIsInputEditable(true); // Cho phép chỉnh sửa nếu điều kiện không đúng
    }
  }, [paymentStages, discountData]);
  //lấy thông tin các giai đoạn
  const fetchPaymentStages = useCallback(async () => {
    try {
      const paymentStagesData = await apiGetPaymentStages(referralBonusesId);
      setPaymentStages(paymentStagesData.data.response);
      const existingNames = paymentStagesData.data.response.map(
        (stage) => stage.description
      );
      setExistingStageNames(existingNames);
    } catch (error) {
      console.error("Error fetching payment stages:", error);
    }
  }, [referralBonusesId]);
  //hiện thông tin các giai đoạn
  useEffect(() => {
    if (referralBonusesId) {
      fetchPaymentStages();
    }
  }, [referralBonusesId, fetchPaymentStages]);
  const handleCreateStage = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleStageNameChange = (e) => {
    setStageName(e.target.value);
  };
  const handleTotalAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Loại bỏ tất cả các ký tự không phải số

    setTotalAmount(value);
  };
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      let totalPaid = 0;
      if (paymentStages) {
        totalPaid = paymentStages.reduce((acc, stage) => acc + stage.paid, 0);
      }
      if (
        isInputEditable &&
        (totalAmount < 500000 ||
          totalAmount > discountData[0].totalAmount - totalPaid)
      ) {
        // Hiển thị thông báo lỗi hoặc xử lý khi giá trị không hợp lệ
        alert(
          `Số tiền phải lớn hơn 500k và nhỏ hơn ${
            discountData[0].totalAmount - totalPaid
          }.`
        );
        return;
      }
      const response = await apiCreatePaymentStages({
        referralBonusesId,
        totalAmount,
        paid: totalAmount, // Giả sử tổng tiền đã thanh toán bằng tổng tiền
        description: stageName,
        endDate: dueDate,
      });
      fetchPaymentStages();
      setIsPopupOpen(false);
      console.log(response);
    } catch (error) {
      console.error("Error creating payment stage:", error);
    }
  };

  // bảng từ đây
  // hành động khi nhấn thanh toán
  const handlePayment = (record) => {
    console.log(record.id);
    setSelectedStageId(record.id);
    setIsPaymentModalOpen(true);
  };

  // xác nhận thanh toán cập nhật ảnh xác minh
  const handleConfirm = async () => {
    // Kiểm tra trước khi gửi
    if (!selectedStageId || !imageData) {
      Swal.fire(
        "Thông báo",
        "Vui lòng chọn hình ảnh trước khi xác nhận.",
        "warning"
      );
      return;
    }
    // Chuẩn bị payload
    const payload = {
      id: selectedStageId,
      paymentProof: imageData, // imageData đã được đọc và lưu dưới dạng base64 bởi FileReader
      status: "Đã thanh toán",
    };
    console.log(payload);
    try {
      // Gọi API để cập nhật
      const response = await apiUpdatePaymentStages(payload);
      console.log(response);
      // Kiểm tra kết quả trả về từ API
      if (response && response.data && response.data.err === 0) {
        Swal.fire(
          "Thành công",
          "Minh chứng thanh toán đã được cập nhật.",
          "success"
        );
        // Cập nhật lại danh sách các giai đoạn thanh toán
        fetchPaymentStages();
        // Đóng modal sau khi cập nhật thành công
        setIsPaymentModalOpen(false);
      } else {
        // Xử lý khi có lỗi từ phía server hoặc do validation
        Swal.fire(
          "Lỗi",
          "Có lỗi xảy ra khi cập nhật minh chứng thanh toán.",
          "error"
        );
      }
    } catch (error) {
      // Xử lý lỗi từ API
      console.error("Error updating payment stage:", error);
      Swal.fire(
        "Lỗi",
        "Có lỗi xảy ra khi cập nhật minh chứng thanh toán.",
        "error"
      );
    }
  };

  // xử lý khi nhấn xem hình ảnh
  const handleViewImage = (imageUrl) => {
    setImageViewerSrc(imageUrl);
    setIsImageViewerOpen(true);
  };

  //xóa giai đoạn
  const handleDelete = async (record) => {
    const response = await apiDeletePaymentStages(record.id);
    if (response?.data.err === 0) {
      Swal.fire("Done", "Xóa thông tin thành công", "success").then(() => {});
      fetchPaymentStages();
    } else {
      alert(response.err);
      Swal.fire("Oops!", "Xóa thông tin không thành công", "error");
    }
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },

    {
      title: "Thanh toán",
      dataIndex: "paid",
      key: "paid",
      sorter: (a, b) => a.paid - b.paid,
      render: (paid) => formatCurrency(paid),
    },
    {
      title: "Hạn thanh toán",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
      render: (endDate) => moment(endDate).format("DD/MM/YYYY"),
    },
    {
      title: "Minh chứng thanh toán",
      dataIndex: "paymentProof",
      key: "paymentProof",
      render: (paymentProof, record) => {
        if (record.status === "Chưa thanh toán") {
          return "Chưa thanh toán";
        } else {
          return (
            <Button
              type="primary"
              className="bg-blue-500"
              onClick={() => handleViewImage(paymentProof)}
            >
              Xem hình ảnh
            </Button>
            // return <img src={paymentProof} alt="Minh chứng thanh toán" />;
          );
        }
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <span>
          {record.status === "Chưa thanh toán" && (
            <Button
              type="primary"
              className="bg-blue-500"
              onClick={() => handlePayment(record)}
            >
              Thanh toán
            </Button>
          )}
          {record.status === "Chưa thanh toán" && (
            <Popconfirm
              className="ml-2"
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={() => handleDelete(record)}
              okButtonProps={{ type: "default" }}
              cancelText="Không"
            >
              <Button type="primary" danger>
                Xóa
              </Button>
            </Popconfirm>
          )}
        </span>
      ),
    },
  ];
  const totalPaid =
    paymentStages?.reduce((acc, stage) => acc + Number(stage.paid), 0) || 0;
  return (
    <div className="p-5">
      <div>
        <div className="text-lg pb-4">
          <p>Tên partner: {discountData?.[0].user?.name}</p>
          <p>
            Tổng tiền thanh toán:{" "}
            {formatCurrency(discountData?.[0].totalAmount)} vnđ
          </p>
        </div>
        {totalPaid < discountData?.[0].totalAmount && (
          <Button1
            text="Tạo giai đoạn"
            bgColor="bg-blue-600"
            textColor="text-white"
            onClick={handleCreateStage}
          />
        )}
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="relative bg-white p-8 rounded-lg shadow-lg">
              <button
                className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
                onClick={handleClosePopup}
              >
                X
              </button>
              <div className="flex flex-col ">
                <label>Tên giai đoạn</label>
                <select
                  value={stageName}
                  onChange={handleStageNameChange}
                  className="form-select mb-4"
                >
                  <option value="">Chọn giai đoạn...</option>
                  {[...Array(20).keys()].map((number) => {
                    const stage = `Giai đoạn ${number + 1}`;
                    if (!existingStageNames.includes(stage)) {
                      return (
                        <option key={number + 1} value={stage}>
                          {stage}
                        </option>
                      );
                    }
                    return null;
                  })}
                </select>

                <label>Số tiền</label>
                <input
                  type="text"
                  placeholder="Số tiền thanh toán"
                  onChange={handleTotalAmountChange}
                  value={formatCurrency(totalAmount)}
                  pattern="[0-9]*"
                  readOnly={!isInputEditable} // Sử dụng state để kiểm soát việc có thể chỉnh sửa hay không
                  className="mb-4"
                />
                <label>Hạn thanh toán</label>
                <input
                  type="date"
                  placeholder="Hạn thanh toán"
                  value={dueDate}
                  onChange={handleDueDateChange}
                  min={new Date().toISOString().split("T")[0]} // Đặt ngày hiện tại làm giới hạn dưới
                  className="mb-4"
                />
                <Button1 onClick={handleSubmit} text="Tạo" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <Table
          dataSource={paymentStages}
          columns={columns}
          scroll={{ x: true }}
          locale={{ emptyText: "Chưa có quá trình thanh toán" }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "row-even" : "row-odd"
          }
          className="py-2 xl:px-2 rounded-xl custom-table bg-white"
        />
        <Modal
          title="Chọn Minh Chứng Thanh Toán"
          visible={isPaymentModalOpen}
          onCancel={() => setIsPaymentModalOpen(false)}
          footer={[
            <Button key="confirm" type="default" onClick={handleConfirm}>
              Xác nhận
            </Button>,
          ]}
        >
          <Upload
            beforeUpload={(file) => {
              const reader = new FileReader();
              reader.onload = (event) => {
                setImageData(event.target.result);
              };
              reader.readAsDataURL(file);
              return false; // Ngăn chặn việc tự động upload khi chọn file
            }}
            maxCount={1} // Chỉ cho phép chọn một hình ảnh
          >
            <Button icon={<UploadOutlined />}>Chọn Hình Ảnh</Button>
          </Upload>
          ;
        </Modal>
        <Modal
          title="Minh chứng thanh toán"
          visible={isImageViewerOpen}
          onCancel={() => setIsImageViewerOpen(false)}
          footer={null} // Không hiển thị footer
        >
          <img
            src={imageViewerSrc}
            alt="Minh chứng thanh toán"
            style={{ width: "100%" }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default PaymentPartner;
