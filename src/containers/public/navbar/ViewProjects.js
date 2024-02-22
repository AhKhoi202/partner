import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../store/actions/project";
import { Table, Space, Input, Form } from "antd";
// import Swal from "sweetalert2";

const ViewProjects = () => {
  const { projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  // const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  // const handleDelete = async (customers) => {};

  // const edit = (record) => {};

  // const save = async (id) => {};


  const column = [
    {
      key: "name",
      title: "Tên khách hàng",
      dataIndex: "name",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.customer.name.localeCompare(b.customer.name),
      render: (text, record) => (
        <span>{record.customer.name}</span>
      ),
    },
    {
      key: "companyName",
      title: "Tên công ty",
      dataIndex: "companyName",
      align: "center",
      edittable: true,
      sorter: (a, b) =>
        a.customer.companyName.localeCompare(b.customer.companyName),
      render: (text, record) => (
        <span>{record.customer.companyName }</span>
      ),
    },
    {
      key: "phone",
      title: "Số điện thoại",
      dataIndex: "phone",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.customer.phone.localeCompare(b.customer.phone),
      render: (text, record) => (
        <span>{ record.customer.phone}</span>
      ),
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
      key: "expectedRevenue",
      title: "Chi phí dự kiến",
      dataIndex: "expectedRevenue",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.expectedRevenue - b.expectedRevenue,
    },
    {
      key: "description",
      title: "Mô tả",
      dataIndex: "description",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    // {
    //   title: "Hành động",
    //   dataIndex: "action",
    //   align: "center",
    //   render: (_, record) => {
    //     const editable = isEditing(record);
    //     return projects.length >= 1 ? (
    //       <Space>
    //         {editable ? (
    //           <span>
    //             <Space>
    //               <Button onClick={() => save(record.id)}>Lưu</Button>
    //               <Popconfirm
    //                 className="m-2"
    //                 title="Bạn chắn chắn không lưu thông tin"
    //                 okButtonProps={{ type: "default" }}
    //                 onConfirm={() => edit(record.id)}
    //               >
    //                 <Button danger>Hủy</Button>
    //               </Popconfirm>
    //             </Space>
    //           </span>
    //         ) : (
    //           <span>
    //             <Space>
    //               <Button onClick={() => edit(record)}>Sửa</Button>
    //               <Popconfirm
    //                 className="m-2"
    //                 title="Xóa khách hàng"
    //                 description="Bạn chắn chắn xóa"
    //                 okButtonProps={{ type: "default" }}
    //                 onConfirm={() => handleDelete(record)}
    //               >
    //                 <Button type="primary" danger>
    //                   Xóa
    //                 </Button>
    //               </Popconfirm>
    //             </Space>
    //           </span>
    //         )}
    //       </Space>
    //     ) : null;
    //   },
    // },
  ];



  const filteredCustomers = searchText
    ? projects.filter(
        (project) =>
          Object.values(project).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
          ) ||
          (project.customer &&
            Object.values(project.customer).some((customerValue) =>
              String(customerValue)
                .toLowerCase().includes(searchText.toLowerCase())
            ))
      )
    : projects;

  return (
    <div className="w-full h-full flex flex-col xl:p-4 p-2">
      <h1 className="text-3xl pl-4 w-full text-start font-medium">
        Danh sách tất cả các khách hàng
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
          
          className="py-4 xl:px-4 px-0 rounded-xl h-full"
          columns={column}
          dataSource={filteredCustomers}
          bordered
          scroll={{ x: true }}
        />
      </Form>
    </div>
  );
};

export default ViewProjects;
