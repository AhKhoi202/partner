import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/actions/user";
import { Table,  Form } from "antd";

const ListPartner = () => {
  const { users } = useSelector((state) => state.customer);
  console.log(users)
  const dispatch = useDispatch();
  const [form] = Form.useForm()


  useEffect(() => {
    dispatch(getUsers());
  }, []);

  

  const column = [
    {
      title: "Teen",
      dataIndex: "name",
      align: "center",
      edittable: true,
    },
    {
      title: "sdt",
      dataIndex: "phone",
      align: "center",
      edittable: true,
    },
    {
      title: "email",
      dataIndex: "email",
      align: "center",
      edittable: true,
    },
    {
      title: "Nghe nghiep",
      dataIndex: "career",
      align: "center",
      edittable: true,
    },
    {
      title: "Chức năng",
      dataIndex: "roleId",
      align: "center",
      edittable: true,
    },
    {
      title: "Hanh dong",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        
          
      },
    },
  ];



  return (
    <div className="w-full h-full">
      <Form form={form} component={false}>
      <Table
  
        className="py-4 px-4 rounded-xl h-full"
        columns={column}
        dataSource={users}
        bordered
      />
      </Form>
    </div>
  );
};






export default ListPartner