import React from "react";
import { useState } from "react";
import validate from "../../../ultils/validataFields";
import { InputForm, Button } from "../../../components";
import { apiResetPassword } from "../../../services";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPlayload] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const location = useLocation();
  const token = location.pathname.split("/reset-password/")[1];
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (payload.password !== payload.passwordConfirmation) {
      // Xử lý trường hợp mật khẩu và xác nhận mật khẩu không khớp
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    const validcounter = validate(payload, setInvalidFields);
    if (validcounter === 0) {
      try {
        // Gọi API để đặt lại mật khẩu
        const response = await apiResetPassword(token, payload.password);
        console.log(response);
        alert("Đặt lại mật khẩu thành công!"); // Hoặc xử lý phản hồi theo cách của bạn
        navigate("/login");
      } catch (error) {
        console.error(error);
        alert("Đã có lỗi xảy ra!"); // Hoặc xử lý lỗi theo cách của bạn
      }
    }
  };

  return (
    <div className="mt-40 d-flex justify-content-center align-items-center">
      <div className="bg-white flex flex-col gap-5 p-3 rounded w-25 ">
        <h4>Nhập mật khẩu mới</h4>
        <InputForm
          onEnterPress={handleSubmit}
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label="Mật khẩu mới"
          value={payload.password}
          setValue={setPlayload}
          keyPayload={"password"}
          type={"password"}
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
  );
}

export default ResetPassword;
