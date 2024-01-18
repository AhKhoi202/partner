import React, { useEffect, useState } from "react";
import { InputForm, Button, InputReadOnly } from "../../../components";
import { useSelector } from "react-redux";
import validate from "../../../ultils/validataFields";
import { apiCreateProject, apiGetCustomerById } from "../../../services";
import { useLocation  } from "react-router-dom";
import Swal from "sweetalert2";


const CreateProject = () => {
  const [customer, setCustomer] = useState(null);
  const [invalidFields, setInvalidFields] = useState([]);
  const { currentData } = useSelector((state) => state.user);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const customerId = searchParams.get("customerId");
  console.log(customerId)
  
  useEffect(() => {
  const fetchCustomer = async () => {
    try {
      const customerResponse = await apiGetCustomerById(customerId);
      setCustomer(customerResponse.data.customer);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  fetchCustomer();
}, [customerId]);

  const [payload, setPlayload] = useState({
    name: "",
    expectedRevenue: "",
    description: ""
  });

  useEffect(() => {
    if (!currentData || !currentData.id) {
      console.log(currentData.id);
      window.location.href = "/login";
    }
  }, [currentData]);
  let finalPayLoad = {
    ...payload,
    userId: currentData.id,
    customerId: customerId,
  };
  const handleSubmit = async () => {
    const validcounter = validate(payload, setInvalidFields);
    if (validcounter === 0) {
      const response = await apiCreateProject(finalPayLoad, customerId);
      if (response?.data.err === 0) {
        Swal.fire(
          "Thành công",
          "Thêm dự án thành công",
          "success"
        ).then(() => {
           window.location.href = "/list-customer";
        });
      } else {
        Swal.fire("Oops!", "Thêm dự án không thành công", "error");
      }
    }
  };

  return (
    <div className="text-black w-full md:w-[600px]  mt-40 flex border-2 border-[#1266dd] shadow-xl shadow-[#1266dd]">
      <div className="w-full p-[50px] pb-[100px] items-center justify-center ">
        <h3 className="font-semibold text-2xl mb-3 text-center">
          Thông tin dự án
        </h3>
        <div className="w-full flex flex-col gap-5">
          <InputReadOnly value={customer?.name} label="Tên khách hàng" />
          <InputReadOnly value={customer?.phone} label="Số điện thoại" />
          <InputReadOnly value={customer?.email} label="Email" />
          <InputReadOnly
            value={customer?.companyName}
            label="Tên công ty"
            flex={" flex-col"}
          />
          <InputForm
            onEnterPress={handleSubmit}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Tên dự án"}
            value={payload.note}
            setValue={setPlayload}
            keyPayload={"name"}
            type={"text"}
          />
          <InputForm
            onEnterPress={handleSubmit}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Mô tả công việc"}
            value={payload.note}
            setValue={setPlayload}
            keyPayload={"description"}
            type={"text"}
          />
          <InputForm
            onEnterPress={handleSubmit}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Chi phí dự tính"}
            value={payload.estimatedCosts}
            setValue={setPlayload}
            keyPayload={"expectedRevenue"}
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

export default CreateProject;
