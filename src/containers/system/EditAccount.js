import React, { useState } from "react";
import { InputReadOnly, InputForm1 } from "../../components";
import { useSelector } from "react-redux";

const EditAccount = () => {
    const { invalidFields, setInvalidFields} = useState([]);
    const { currentData} = useSelector(state => state.user)
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl w-full text-start font-medium py-4 border-b border-gray-200">
        Sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 flex items-center justify-center flex-auto">
        <div className="py-6 flex flex-col gap-4 w-full">
          <InputReadOnly value={currentData?.id} label="Ma thanh vien" />
          <InputReadOnly value={currentData?.phone} label="So dien thoai" />
          <InputForm1 setInvalidFields={setInvalidFields} invalidFields={invalidFields} label='Tên hiện thị' />
          <InputForm1 setInvalidFields={setInvalidFields} invalidFields={invalidFields} label='Tên hiện thị' />
          <InputForm1 setInvalidFields={setInvalidFields} invalidFields={invalidFields} label='Tên hiện thị' />
          <div className="flex">
            <label className="'w-48 flex-none" htmlFor="password">
              Mật khẩu
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
