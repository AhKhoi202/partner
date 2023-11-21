import React, { useEffect, useState } from "react";
import { InputForm, Button } from "../../components";
import * as action from '../../store/actions'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


const PotentialCustomers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector(state => state.auth)

  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPlayload] = useState({
    phone: "",
    password: "",
    name: "",
    email: "",
    note: "",
   

  });

 

  // const handleSubmit = async () => {
  //   //   console.log(payload)
  //   let invalids = validate(payload);
  //   dispatch(action.register(payload))

  //   // console.log(invalids); 
  // };

  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Bạn không được bỏ trống trường này.",
          },
        ]);
        invalids++;
      }
    });
    return invalids;
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
          value={payload.email}
          setValue={setPlayload}
          keyPayload={"note"}
          type={"note"}
        />
        
        
        <Button
          text={"Gửi"}
          bgColor="bg-[#1266dd]"
          textColor="text-black"
          fullWidth
          // onClick={handleSubmit}
        />
      </div>
    </div>
  </div>
  )
}

export default PotentialCustomers