import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../store/actions/user";
import { Table, Popconfirm, Button, Space, Input, Form } from "antd";
import Swal from "sweetalert2";
import { apiDeleteCustomers, apiEditCustomers } from "../../services";
import "../../index.css";
const ListCustomers = () => {
  const { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  console.log(customers);
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);
  const handleDelete = async (customers) => {
    const response = await apiDeleteCustomers(customers.id);
    if (response?.data.err === 0) {
      edit(false);
      Swal.fire("Done", "Xóa thông tin thành công", "success").then(() => {
        dispatch(getCustomers());
      });
    } else {
      alert(response.err);
      Swal.fire("Oops!", "Xóa thông tin không thành công", "error");
    }
  };

  const edit = (record) => {
    form.setFieldsValue({
      id: record.id,
      ...record,
    });
    setEditingKey(record.id);
  };

  const save = async (id) => {
    const row = await form.validateFields();
    console.log(row);
    const response = await apiEditCustomers(row);
    if (response?.data.err === 0) {
      edit(false);
      Swal.fire("Done", "Chỉnh sửa thông tin thành công", "success").then(
        () => {
          dispatch(getCustomers());
        }
      );
    } else {
      Swal.fire("Oops!", "Chỉnh sửa thông tin không thành công", "error");
    }
  };

  const EditTableCell = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    const input = <Input />;
    return (
      <td {...restProps}>
        <Form.Item
          name="id"
          hidden // Ẩn trường id nếu không muốn hiển thị
        />
        {editing ? (
          <Form.Item
            id={record.id}
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `vui long nhap ${title}`,
              },
            ]}
          >
            {input}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const column = [
    {
      key: "name",
      title: "Tên khách hàng",
      dataIndex: "name",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.name.localeCompare(b.name),

      // sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order
    },
    {
      key: "companyName",
      title: "Tên công ty",
      dataIndex: "companyName",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    },
    {
      key: "phone",
      title: "Sđt",
      dataIndex: "phone",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      key: "note",
      title: "Mô tả yêu cầu",
      dataIndex: "note",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.note.localeCompare(b.note),
    },
    {
      key: "estimatedCosts",
      title: "Chi phí dự tính",
      dataIndex: "estimatedCosts",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.estimatedCosts - b.estimatedCosts,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return customers.length >= 1 ? (
          <Space>
            {editable ? (
              <span>
                <Space>
                  <Button onClick={() => save(record.id)}>Lưu</Button>
                  <Popconfirm
                    className="m-2"
                    title="Bạn chắn chắn không lưu thông tin"
                    okButtonProps={{ type: "default" }}
                    onConfirm={() => edit(record.id)}
                  >
                    <Button danger>Hủy</Button>
                  </Popconfirm>
                </Space>
              </span>
            ) : (
              <span>
                <Space>
                  <Button onClick={() => edit(record)}>Sửa</Button>
                  <Popconfirm
                    className="m-2"
                    title="Xóa khách hàng"
                    description="Bạn chắn chắn xóa"
                    okButtonProps={{ type: "default" }}
                    onConfirm={() => handleDelete(record)}
                  >
                    <Button type="primary" danger>
                      Xóa
                    </Button>
                  </Popconfirm>
                </Space>
              </span>
            )}
          </Space>
        ) : null;
      },
    },
  ];

  const isEditing = (record) => {
    return record.id === editingKey;
  };

  const mergedColumns = column.map((col) => {
    if (!col.edittable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const filteredCustomers = searchText
    ? customers.filter((customer) =>
        Object.values(customer).some((value) =>
          value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : customers;
  return (
    <div className="w-full h-full flex flex-col xl:p-4 p-2">
      <h1 className="text-xl pl-4 w-full text-start font-medium">
        Danh sách khách hàng đã giới thiệu
      </h1>
      <Space className="justify-end pb-4">
        <Input
          placeholder="Tìm kiếm khách hàng"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Space>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditTableCell,
            },
          }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "row-even" : "row-odd"
          }
          className="py-4 xl:px-4 px-0 rounded-xl h-full custom-table bg-white"
          columns={mergedColumns}
          dataSource={filteredCustomers}
          bordered
          scroll={{ x: true }}
        />
      </Form>
    </div>
  );
};

export default ListCustomers;
