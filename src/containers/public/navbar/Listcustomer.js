import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/table/Table";
import { getCustomers } from "../../../store/actions/user";
import { useNavigate } from "react-router-dom";

const Listcustomer = () => {
  const { customers } = useSelector((state) => state.customer);
  const { currentData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const headerMapping = [
    { key: "name", header: "Tên" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Số điện thoại" },
    { key: "companyName", header: "Tên công ty" },
  ];
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);
  const invisibleColumns = [
    "id",
    "userId",
    "createdAt",
    "updatedAt",
    "note",
    "estimatedCosts",
  ];
  const navigate = useNavigate();
  const handleCreateProject = (item) => {
    const customerId = item.id;
    console.log(currentData.id, "Tạo dự án với id:", customerId);
    navigate(`/create-project?customerId=${customerId}`);
  };

  return (
    <div className="text-black bg-white w-full mt-40 pb-6 flex flex-col">
      <h1 className="text-3xl p-4 w-full text-start font-medium">
        Dach sách các khách hàng mà bạn đã giới thiệu
      </h1>
      <Table
        className={"m-auto"}
        data={customers}
        headerMapping={headerMapping}
        invisibleColumns={invisibleColumns}
        buttonText={"Tạo dự án"}
        onClick={(item) => handleCreateProject(item)}
      />
    </div>
  );
};

export default Listcustomer;
