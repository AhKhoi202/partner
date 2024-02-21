import React, { useEffect, useState } from "react";
import {
  apiGetPaymentStages,
  apiCreatePaymentStages,
} from "../../../services/payment";
import { Button } from "../../../components";
import { useSearchParams } from "react";

const PaymentPartner = () => {
  const [paymentStages, setPaymentStages] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [stageName, setStageName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [referralBonusesId, setReferralBonusesId] = useState("");

  useEffect(() => {
    const url = window.location.href;
    const id = url.split("?")[1];
    // console.log(id);
    setReferralBonusesId(id);
  }, []);
  console.log(referralBonusesId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentStagesData = await apiGetPaymentStages();
        setPaymentStages(paymentStagesData.response);
        console.log(paymentStagesData.response); // In thông tin các giai đoạn thanh toán ra console
      } catch (error) {
        console.error("Error fetching payment stages:", error);
      }
    };

    fetchData();
  }, []);

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
      const response = await apiCreatePaymentStages({
        referralBonusesId,
        totalAmount,
        paid: totalAmount, // Giả sử tổng tiền đã thanh toán bằng tổng tiền
        // endDate: dueDate,
      });
      console.log(response);
      // Xử lý khi tạo giai đoạn thành công
    } catch (error) {
      console.error("Error creating payment stage:", error);
      // Xử lý khi tạo giai đoạn không thành công
    }
  };
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div>
      <Button
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
            <div className="flex flex-col space-y-4">
              <select
                value={stageName}
                onChange={handleStageNameChange}
                className="form-select"
              >
                <option value="">Chọn giai đoạn...</option>
                {[...Array(20).keys()].map((number) => (
                  <option key={number + 1} value={`Giai đoạn ${number + 1}`}>
                    Giai đoạn {number + 1}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Tổng tiền"
                onChange={handleTotalAmountChange}
                value={formatCurrency(totalAmount)}
                pattern="[0-9]*"
              />
              <input
                type="date"
                placeholder="Hạn thanh toán"
                value={dueDate}
                onChange={handleDueDateChange}
              />
              <Button onClick={handleSubmit} text="Tạo" />
            </div>
          </div>
        </div>
      )}
      {paymentStages && (
        <div>
          {paymentStages.map((stage) => (
            <div key={stage.id}>{/* Hiển thị thông tin giai đoạn */}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentPartner;
