import React, { useState } from "react";
import { InputReadOnly, InputForm1, Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateUser } from "../../services";
import validate from "../../ultils/validataFields";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { getCurrent } from "../../store/actions";

const EditAccount = () => {
  const dispatch = useDispatch();
  const [invalidFields, setInvalidFields] = useState([]);
  const { currentData } = useSelector((state) => state.user);
  const [payload, setPayload] = useState({
    name: currentData?.name || "",
    email: currentData?.email || "",
    address: currentData?.address || "",
    career: currentData?.career || "",
    selfReferralCode: currentData?.selfReferralCode || "",
  });
  const handleSubmit = async () => {
    const validcounter = validate(payload, setInvalidFields);
    if (validcounter === 0) {
      const response = await apiUpdateUser(payload);
      if (response?.data.err === 0) {
        Swal.fire("Done", "Chỉnh sửa thông tin thành công", "success").then(
          () => {
            dispatch(getCurrent());
          }
        );
      } else {
        Swal.fire("Oops!", "Chỉnh sửa thông tin không thành công", "error");
      }
    }
  };
  console.log(currentData);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl pl-4 w-full text-start font-medium py-4 border-b border-gray-200">
        Sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 flex items-center justify-center flex-auto">
        <div className="py-6 flex flex-col gap-4 w-full">
          <InputReadOnly
            value={currentData?.id?.match(/\d/g).join("")?.slice(0, 6) || ""}
            label="Mã thành viên"
          />
          <InputReadOnly
            editPhone
            value={currentData?.phone}
            label="Số điện thoại"
          />
          <InputReadOnly
            value={currentData["code.code"]}
            label="Mã giới thiệu"
          />
          <InputForm1
            name="name"
            setValue={setPayload}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            value={payload.name}
            label="Họ và tên"
          />
          <InputForm1
            name="email"
            setValue={setPayload}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            value={payload.email}
            label="Email"
          />
          <InputForm1
            name="address"
            setValue={setPayload}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            value={payload.address}
            label="Địa chỉ"
          />
          <InputForm1
            name="career"
            setValue={setPayload}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            value={payload.career}
            label="Ngành nghề"
          />
          <div className="flex">
            <h1 className="sm:w-48 w-20 flex-none " htmlFor="password">
              Mật khẩu
            </h1>
            <NavLink
              className="flex-auto text-blue-500 cursor-pointer"
              to={"/he-thong/doi-mat-khau"}
            >
              Đổi mật khẩu
            </NavLink>
          </div>

          <Button
            text="Cập nhật"
            bgColor="bg-blue-600"
            textColor="text-white"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
