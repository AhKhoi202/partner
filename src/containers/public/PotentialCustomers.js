import React, { useState } from "react";
import { InputForm, Button } from "../../components";
import { useSelector} from 'react-redux'
import validate from "../../ultils/validataFields";
import { apiCreateCustomers } from "../../services";


const PotentialCustomers = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  const {currentData} = useSelector(state => state.user)
  const [payload, setPlayload] = useState({
    phone: "",
    name: "",
    email: "",
    note: "",
  });

  const handleSubmit = async () => {
    // const validcounter = validate(payload, setInvalidFields);
    let finalPayLoad = {
      ...payload,
      userid: currentData.id
    }
    const response = await apiCreateCustomers(finalPayLoad);

      console.log(finalPayLoad)

    console.log(response); 
  };

 
  return (
    <div className=" text-black w-[750px] flex border-2 border-[#1266dd] shadow-xl shadow-[#1266dd]">
    <div className="w-full p-[50px] pb-[100px] items-center justify-center ">
      <h3 className="font-semibold text-2xl mb-3 text-center">
        Thông tin khách hàng
      </h3>
      <div className="w-full flex flex-col gap-5">
        <InputForm
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={"Tên khách hàng"}
          value={payload.name}
          setValue={setPlayload}
          keyPayload={"name"}
          type={"name"}
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Email"}
            value={payload.email}
            setValue={setPlayload}
            keyPayload={"email"}
            type={"email"}
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Số điện thoại"}
            value={payload.phone}
            setValue={setPlayload}
            keyPayload={"phone"}
            type={"phone"}
          /><InputForm
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={"Ghi chú"}
          value={payload.note}
          setValue={setPlayload}
          keyPayload={"note"}
          type={"note"}
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
  )
}

export default PotentialCustomers