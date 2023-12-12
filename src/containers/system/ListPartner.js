import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/actions/user";
import { Table, Popconfirm, Button, Space, Input, Form } from "antd";
import { apiEditUsers } from "../../services";

const ListPartner = () => {
  const { users } = useSelector((state) => state.allUsers);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleDelete = async (users) => {
    // const response = await apiDeleteCustomers(customers.id);
    // if (response?.data.err === 0) {
    //   dispatch(getCustomers());
    // } else {
    //   alert(response.err);
    // }
    // console.log(response);
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
    const response = await apiEditUsers(row);
    if (response?.data.err === 0) {
      edit(false);
      dispatch(getAllUsers());
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
      title: "Sđt",
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
      title: "Địa chỉ",
      dataIndex: "address",
      align: "center",
      edittable: true,
    },
    {
      title: "Chức năng",
      dataIndex: "role.name",
      align: "center",
      edittable: true,
    },
    {
      title: "Hanh dong",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return users.length >= 1 ? (
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
          dataSource={users}
          bordered
        />
      </Form>
    </div>
  );
};

export default ListPartner;