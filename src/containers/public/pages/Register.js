import React, { useEffect, useState } from "react";
import { InputForm, Button } from "../../../components";
import * as action from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "../../../ultils/validataFields";
import { Link } from "react-router-dom";
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
    passwordConfirmation: "",
    referralCode: "",
  });

  useEffect(() => {
    isLoggedIn && navigate("/");
  });

  useEffect(() => {
    msg && Swal.fire("Oops!", msg, "error");
  }, [msg, update]);

  const handleSubmit = async () => {
    const validcounter = validate(payload, setInvalidFields);
    if (validcounter === 0) {
      dispatch(action.register(payload));
    }
    console.log(validcounter);
  };

  return (
    <div className="text-black w-full md:w-[750px] flex border-2 border-[#1266dd] shadow-xl shadow-[#1266dd]">
      <div className="w-full p-[30px] items-center justify-center ">
        <h3 className="font-semibold text-2xl mb-3 text-center">
          Đăng ký làm partner
        </h3>
        <div className="w-full flex flex-col gap-3">
          <div className="flex sm:flex-row flex-col">
            <InputForm
              onEnterPress={handleSubmit}
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label={"Tên của bạn"}
              value={payload.name}
              setValue={setPlayload}
              keyPayload={"name"}
              type="name"
              className={`sm:w-4/12 w-full `}
            />
            <InputForm
              onEnterPress={handleSubmit}
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label={"Email"}
              value={payload.email}
              setValue={setPlayload}
              keyPayload={"email"}
              type={"email"}
              className={`sm:w-5/12 w-full `}
            />
            <InputForm
              onEnterPress={handleSubmit}
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label={"Số điện thoại"}
              value={payload.phone}
              setValue={setPlayload}
              keyPayload={"phone"}
              type={"number"}
              className={`sm:w-3/12 w-full `}
            />
          </div>
          <InputForm
            onEnterPress={handleSubmit}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Ngành nghề"}
            value={payload.career}
            setValue={setPlayload}
            keyPayload={"career"}
            type={"career"}
          />
          <InputForm
            onEnterPress={handleSubmit}
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
          <div className="flex sm:flex-row flex-col">
            <InputForm
              onEnterPress={handleSubmit}
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label="Mật khẩu"
              value={payload.password}
              setValue={setPlayload}
              keyPayload={"password"}
              type={"password"}
              className={`sm:w-1/3 w-full `}
            />
            <InputForm
              onEnterPress={handleSubmit}
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label="Xác nhận mật khẩu"
              value={payload.passwordConfirmation}
              setValue={setPlayload}
              keyPayload={"passwordConfirmation"}
              type={"password"}
              className={`sm:w-1/3 w-full `}
            />
            <InputForm
              onEnterPress={handleSubmit}
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label="Mã giới thiệu"
              value={payload.referralCode}
              setValue={setPlayload}
              keyPayload={"referralCode"}
              type={"text"}
              className={`sm:w-1/3 w-full `}
            />
          </div>
          <div></div>
          <div className="flex flex-row gap-2">
            <Button
              text={"Đăng ký"}
              bgColor="bg-[#1266dd] "
              textColor="text-black"
              fullWidth
              onClick={handleSubmit}
            />
            <Link
              to="/login"
              className="text-black bg-[#1266dd] w-full border-2 border-[#1266dd] outline-none rounded-full flex items-center justify-center"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
