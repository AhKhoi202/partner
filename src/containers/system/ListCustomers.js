import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../store/actions/user";

const ListCustomers = () => {
  const { customers } = useSelector((state) => state.customer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  const column = [
    { name: "Tên khách hàng", selector: (row) => row.name, sortable: true },
    { name: "Sđt", selector: (row) => row.phone },
    { name: "Email", selector: (row) => row.email },
    { name: "Mô tả công việc", selector: (row) => row.note },
    { name: "Thời gian giới thiệu", selector: (row) => row.createdAt, sortable: true },
  ];
  return (
    <div>
      <DataTable columns={column} data={customers}></DataTable>
    </div>
  );
};

export default ListCustomers;
