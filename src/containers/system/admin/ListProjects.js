import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../../store/actions/project";
import { Table, Button, Space, Input, Form } from "antd";
import { useNavigate } from "react-router-dom";

const ListProjects = () => {
  const { projects } = useSelector((state) => state.allProjects);
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  console.log(projects);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);
  const navigate = useNavigate();

  const detailProject = async (id) => {
    console.log(id);
    navigate(`/he-thong/chi-tiet-du-an?projectId=${id}`);
  };
  const payment = async (id) => {
    console.log(id);
    navigate(`/he-thong/payment-project?${id}`);
  };
  const column = [
    {
      key: "name",
      title: "Tên khách hàng",
      dataIndex: "name",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.customer.name.localeCompare(b.customer.name),
      render: (text, record) => <span>{record.customer.name}</span>,
    },
    {
      key: "companyName",
      title: "Tên công ty",
      dataIndex: "companyName",
      align: "center",
      edittable: true,
      sorter: (a, b) =>
        a.customer.companyName.localeCompare(b.customer.companyName),
      render: (text, record) => <span>{record.customer.companyName}</span>,
    },
    {
      key: "phone",
      title: "Số điện thoại",
      dataIndex: "phone",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.customer.phone.localeCompare(b.customer.phone),
      render: (text, record) => <span>{record.customer.phone}</span>,
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.customer.email.localeCompare(b.customer.email),
      render: (text, record) => (
        <span>{record.customer ? record.customer.email : ""}</span>
      ),
    },
    {
      key: "name",
      title: "Tên dự án",
      dataIndex: "name",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      key: "name",
      title: "Tên partner",
      dataIndex: "name",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.user.name.localeCompare(b.user.name),
      render: (text, record) => <span>{record.user.name}</span>,
    },
    {
      key: "status",
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        return projects.length >= 1 ? (
          <Space>
            <Button
              type="primary"
              className="bg-blue-500"
              onClick={() => detailProject(record.id)}
            >
              Chi tiết
            </Button>
            <Button
              type="primary"
              className="bg-blue-500"
              onClick={() => payment(record.id)}
            >
              Thanh toán
            </Button>
          </Space>
        ) : null;
      },
    },
  ];
  if (currentData.roleId !== "r1") {
    return <div>Không có quyền truy cập</div>;
  }

  const filteredProjects = searchText
    ? projects.filter((project) =>
        Object.values(project).some((value) =>
          (value?.toString() ?? "")
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      )
    : projects;
  return (
    <div className="w-full h-full flex flex-col xl:p-4 p-2">
      <h1 className="text-3xl pl-4 w-full text-start font-medium">
        Các dự án hiện có
      </h1>
      <Space className=" justify-end pb-4">
        <Input
          placeholder="Tìm kiếm khách hàng"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Space>
      <Form form={form} component={false}>
        <Table
          className="rounded-xl max-w-full h-full"
          columns={column}
          dataSource={filteredProjects}
          bordered
          scroll={{ x: true }}
          tableStyle={{ backgroundColor: "#0000FF" }}
          headerStyle={{ backgroundColor: "#FF0000", color: "#FFFFFF" }}
        />
      </Form>
    </div>
  );
};

export default ListProjects;
