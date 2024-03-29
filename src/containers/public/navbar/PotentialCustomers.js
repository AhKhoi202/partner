import React, { useState } from "react";
import { InputForm, Button } from "../../../components";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import validate from "../../../ultils/validataFields";
import { apiCreateCustomers } from "../../../services";

const PotentialCustomers = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  const { currentData } = useSelector((state) => state.user);
  const [payload, setPlayload] = useState({
    phone: "",
    name: "",
    companyName: "",
    email: "",
    note: "",
    estimatedCosts: "",
  });
  if (!currentData || !currentData.id) {
    window.location.href = "/login";
    return null;
  }

  const handleSubmit = async () => {
    let finalPayLoad = {
      ...payload,
      userid: currentData.id,
    };
    const validcounter = validate(payload, setInvalidFields);
    if (validcounter === 0) {
      const response = await apiCreateCustomers(finalPayLoad);
      if (response?.data.err === 0) {
        Swal.fire(
          "Thành công",
          "Giới thiệu khách hàng thành công",
          "success"
        ).then(() => {
          setPlayload({
            phone: "",
            name: "",
            email: "",
            note: "",
            estimatedCosts: "",
          });
        });
      } else {
        Swal.fire("Oops!", "Giới thiệu khách hàng không thành công", "error");
      }
    }
  };

  return (
    <div className="text-black w-full md:w-[600px] flex border-2 border-[#1266dd] shadow-xl shadow-[#1266dd]">
      <div className="w-full p-[50px] pb-[100px] items-center justify-center ">
        <h3 className="font-semibold text-2xl mb-3 text-center">
          Thông tin khách hàng
        </h3>
        <div className="w-full flex flex-col gap-5">
          <InputForm
            onEnterPress={handleSubmit}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Tên khách hàng"}
            value={payload.name}
            setValue={setPlayload}
            keyPayload={"name"}
            type={"text"}
          />
          <InputForm
            onEnterPress={handleSubmit}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Tên công ty"}
            value={payload.companyName}
            setValue={setPlayload}
            keyPayload={"companyName"}
            type={"text"}
          />
          <InputForm
            onEnterPress={handleSubmit}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Email"}
            value={payload.email}
            setValue={setPlayload}
            keyPayload={"email"}
            type={"text"}
          />
          <InputForm
            onEnterPress={handleSubmit}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Số điện thoại"}
            value={payload.phone}
            setValue={setPlayload}
            keyPayload={"phone"}
            type={"phone"}
          />
          <InputForm
            onEnterPress={handleSubmit}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Mô tả công việc"}
            value={payload.note}
            setValue={setPlayload}
            keyPayload={"note"}
            type={"text"}
          />
          <InputForm
            onEnterPress={handleSubmit}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Chi phí dự tính"}
            value={payload.estimatedCosts}
            setValue={setPlayload}
            keyPayload={"estimatedCosts"}
            type={""}
          />
          <Button
            text={"Gửi"}
            bgColor="bg-[#1266dd]"
            textColor="text-black"
            fullWidth
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default PotentialCustomers;
