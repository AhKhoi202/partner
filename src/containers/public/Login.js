import React, { useEffect, useState } from "react";
import { InputForm, Button } from "../../components";
import * as action from "../../store/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Login = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [payload, setPlayload] = useState({
    phone: "",
    password: "",
  });

  useEffect(() => {
    isLoggedIn && navigate("/");
  });

  useEffect(() => {
    msg && Swal.fire("Oops!", msg, "error");
  }, [msg, update]);

  const handleSubmit = async () => {
    let invalids = validate(payload);
    dispatch(action.login(payload));
    console.log(invalids);

  };

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
    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Mật khẩu phải có tối thiểu 6 kí tự.",
              },
            ]);
            invalids++;
          }
          break;
        case "phone":
          if (!+item[1]) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Số điện thoại không hợp lệ.",
              },
            ]);
            invalids++;
          }
          break;

        default:
          break;
      }
    });
    return invalids;
  };

  return (
    <div className="bg-gradient-to-bl text-white from-[#1266dd] to-black w-[750px] flex border-2 border-[#1266dd] shadow-xl shadow-[#1266dd]">
      <div className="w-2/4 p-[50px] pb-[100px] items-center justify-center ">
        <h3 className="font-semibold text-2xl mb-3 text-center">Đăng nhập</h3>
        <div className="w-full flex flex-col gap-5">
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
            label="Mật khẩu"
            value={payload.password}
            setValue={setPlayload}
            keyPayload={"password"}
            type={"password"}
          />
          <Button
            text={"Đăng nhập"}
            bgColor="bg-gradient-to-b from-[#1266dd] to-white "
            textColor="text-white"
            fullWidth
            onClick={handleSubmit}
          />
        </div>
        <div className="mt-7 flex items-center justify-between">
          <small className="text-[white] hover:text-[red] cursor-pointer">
            Bạn quên mật khẩu
          </small>
          <small className="text-[white] hover:text-[red] cursor-pointer">
            Tạo tài khoản mới
          </small>
        </div>
      </div>
      <div className="w-2/4 p-[100px] pr-[50px] items-center h-full text-right ">
        <h3 className="font-semibold text-2xl mb-3">WELCOME TO BLUEBOLT</h3>
      </div>
    </div>
  );
};

export default Login;
