import React, { useEffect, useState } from "react";
import {
  apiGetPaymentStages,
  apiCreatePaymentStages,
} from "../../../services/payment";
import { apiGetDiscountById } from "../../../services/project";
import { Button } from "../../../components";

const PaymentPartner = () => {
  const [paymentStages, setPaymentStages] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [stageName, setStageName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [referralBonusesId, setReferralBonusesId] = useState("");
  const [existingStageNames, setExistingStageNames] = useState([]);
  const [discountData, setDiscountData] = useState(null);

  //lấy id từ link
  useEffect(() => {
    const url = window.location.href;
    const id = url.split("?")[1];
    setReferralBonusesId(id);
  }, []);
  //lấy thông tin các giai đoạn
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

  console.log(discountData[0].totalAmount);
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

  return (
    <div className="p-5">
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
                className="mb-4"
              />
              <label>Hạn thanh toán</label>
              <input
                type="date"
                placeholder="Hạn thanh toán"
                value={dueDate}
                onChange={handleDueDateChange}
                className="mb-4"
              />
              <Button onClick={handleSubmit} text="Tạo" />
            </div>
          </div>
        </div>
      )}
      {paymentStages && (
        <div>
          {paymentStages.map((stage) => (
            <div key={stage.id}>
              <p>Referral Bonuses ID: {stage.referralBonusesId}</p>
              <p>Thanh toán: {stage.paid}</p>
              <p>Tên: {stage.description || "N/A"}</p>
              <p>End Date: {stage.endDate || "N/A"}</p>
              <p>Status: {stage.status}</p>
              <p>
                ==================================================================
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentPartner;
