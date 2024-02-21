import React, { useEffect, useState } from "react";
import {
  apiGetPaymentStages,
  apiCreatePaymentStages,
} from "../../../services/payment";
import { apiGetDiscountById } from "../../../services/project";
import { Button as Button1 } from "../../../components";
import { Table, Button, Popconfirm } from "antd";
import moment from "moment";

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

  //lấy id từ link
  useEffect(() => {
    const url = window.location.href;
    const id = url.split("?")[1];
    setReferralBonusesId(id);
  }, []);
  //hiện thông tin các giai đoạn
  useEffect(() => {
    fetchPaymentStages();
  }, []);

  //lấy thông tin chiết khấu của partner
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetDiscountById(referralBonusesId);
        console.log(response);
        setDiscountData(response.data.response);
      } catch (error) {
        console.error("Error fetching discount:", error);
      }
    };
    fetchData();
  }, [referralBonusesId]);
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
  const fetchPaymentStages = async () => {
    try {
      const paymentStagesData = await apiGetPaymentStages();
      setPaymentStages(paymentStagesData.response);
      const existingNames = paymentStagesData.response.map(
        (stage) => stage.description
      );
      setExistingStageNames(existingNames);
    } catch (error) {
      console.error("Error fetching payment stages:", error);
    }
  };
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
      console.log(totalPaid);
      console.log(totalAmount);
      console.log(discountData[0].totalAmount);
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
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // bảng từ đây
  const handlePayment = (record) => {
    // Xử lý khi người dùng nhấn vào nút "Thanh toán"
  };

  const handleDelete = (record) => {
    // Xử lý khi người dùng nhấn vào nút "Xóa"
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
    },
    {
      title: "Hạn thanh toán",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
      render: (endDate) => moment(endDate).format("DD/MM/YYYY"),
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
          <Button
            type="primary"
            className="bg-blue-500"
            onClick={() => handlePayment(record)}
          >
            Thanh toán
          </Button>
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
        </span>
      ),
    },
  ];
  return (
    <div className="p-5">
      <div>
        <Button1
          text="Tạo giai đoạn"
          bgColor="bg-blue-600"
          textColor="text-white"
          onClick={handleCreateStage}
        />
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
      <Table dataSource={paymentStages} columns={columns} />
    </div>
  );
};

export default PaymentPartner;
