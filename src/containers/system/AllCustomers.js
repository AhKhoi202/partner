import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "../../store/actions/user";
import { Table, Popconfirm, Button, Space, Input, Form } from "antd";
import { apiDeleteCustomers, apiEditCustomers } from "../../services";

const AllCustomers = () => {
  const { customers } = useSelector((state) => state.allCustomer);
  const dispatch = useDispatch();
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  
  const handleDelete = async (customers) => {
    const response = await apiDeleteCustomers(customers.id);
    if (response?.data.err === 0) {
      dispatch(getAllCustomers());
    } else {
      alert(response.err);
    }
    console.log(response);
  };

  const edit = (record) => {
    if (record.dataIndex === "user") {
      // Hiển thị cảnh báo
      alert("Không thể chỉnh sửa cột 'Tên partner'");
      return;
    }
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
      dispatch(getAllCustomers());
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
      title: "Tên",
      dataIndex: "name",
      align: "center",
      edittable: true,
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      align: "center",
      edittable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      edittable: true,
    },
    {
      title: "Mô tả công việc",
      dataIndex: "note",
      align: "center",
      edittable: true,
    },
    {
      title: "Tên partner",
      dataIndex: "user",
      key: "user",
      align: "center",
      edittable: true,
      render: (user) => user.name,
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

  return (
    <div className="w-full h-full">
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditTableCell,
            },
          }}
          className="py-4 px-4 rounded-xl h-full"
          columns={mergedColumns}
          dataSource={customers}
          bordered
        />
      </Form>
    </div>
  );
};

export default AllCustomers;
