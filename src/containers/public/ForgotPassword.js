import React from "react";
import { useState,  } from "react";
import { InputForm, Button } from "../../components";
import { useNavigate  } from "react-router-dom"; 
import Swal from "sweetalert2";
import { apiForgorPassword } from "../../services";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const [invalidFields, setInvalidFields] = useState([]);
  
  const [payload, setPlayload] = useState({
    email: "",
  });
  const handleSubmit = async() => {
    const response =  await apiForgorPassword(payload.email);
    console.log(response);
    if (response.data.success) {
      Swal.fire("Done", "Vui lòng kiểm tra email", "success").then(
        () => {
        }
      );
    } else {
      Swal.fire("Oops!", "Email không hợp lệ", "error");
    }
  };
  return (
    <div className="mt-40 d-flex justify-content-center align-items-center bg-secondary ">
      <div className="bg-white p-3 rounded w-25">
        <h4>Quên mật khẩu</h4>
        <div className="w-full flex  mb-3  flex-col gap-5">
          <InputForm
            onEnterPress={handleSubmit}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Email"}
            value={payload.email}
            setValue={setPlayload}
            keyPayload={"email"}
            type={"email"}
          />
        </div>
        <div className="w-full flex gap-2">
          <Button
            text={"Xác nhận"}
            bgColor="bg-[#1266dd]"
            textColor="text-black"
            fullWidth
            onClick={handleSubmit}
          />
          <Button
            text={"Đăng nhập"}
            bgColor="bg-orange-500 border-none"
            textColor="text-black"
            fullWidth
            onClick={handleBack}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
