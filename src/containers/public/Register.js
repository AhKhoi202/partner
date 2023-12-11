import React, { useEffect, useState } from "react";
import { InputForm, Button } from "../../components";
import * as action from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "../../ultils/validataFields";
import Swal from "sweetalert2";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPlayload] = useState({
    phone: "",
    password: "",
    name: "",
    email: "",
    career: "",
    address: "",
  });

  useEffect(() => {
    isLoggedIn && navigate("/");
  });

  useEffect(() => {
    msg && Swal.fire("Oops!", msg, "error");
  }, [msg, update]);

  const handleSubmit = async () => {
    console.log(payload);
    const validcounter = validate(payload, setInvalidFields);
    if (validcounter === 0) {
      dispatch(action.register(payload));
    }
    console.log(validcounter);
  };

  return (
    <div className="text-black w-full md:w-[750px] flex border-2 border-[#1266dd] shadow-xl shadow-[#1266dd]">
      <div className="w-full p-[50px] pb-[100px] items-center justify-center ">
        <h3 className="font-semibold text-2xl mb-3 text-center">
          Đăng ký làm partner
        </h3>
        <div className="w-full flex flex-col gap-5">
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Tên của bạn"}
            value={payload.name}
            setValue={setPlayload}
            keyPayload={"name"}
            type="name"
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
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Ngành nghề"}
            value={payload.career}
            setValue={setPlayload}
            keyPayload={"career"}
            type={"career"}
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Địa chỉ"}
            value={payload.address}
            setValue={setPlayload}
            keyPayload={"address"}
            type={"address"}
          />
          {/* <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Giói tính"}
            value={payload.gender}
            setValue={setPlayload}
            keyPayload={"gender"}
            type={"gender"}
          /> */}

          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label="Mật khẩu"
            value={payload.password}
            setValue={setPlayload}
            keyPayload={"password"}
            type={"password"}
          />
          <Button
            text={"Đăng ký"}
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

export default Register;
