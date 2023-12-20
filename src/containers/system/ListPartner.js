import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/actions/user";
import { Table, Popconfirm, Button, Space, Input, Form } from "antd";
import Swal from "sweetalert2";
import { apiDeleteUsers, apiEditUsers } from "../../services";

const ListPartner = () => {
  const { users } = useSelector((state) => state.allUsers);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const { currentData } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (users) => {
    if (currentData?.id === users.id) {
      Swal.fire("Oops!", "Không thể xóa chính mình", "error");
    } else {
      const response = await apiDeleteUsers(users.id);
      if (response?.data.err === 0) {
        edit(false);
        Swal.fire("Done", "Xóa thông tin thành công", "success").then(() => {
          dispatch(getAllUsers());
        });
      } else {
        alert(response?.data.msg);
        Swal.fire("Oops!", "Xóa thông tin không thành công", "error");
        console.log(response.msg);
      }
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
    const response = await apiEditUsers(row);
    if (response?.data.err === 0) {
      edit(false);
      Swal.fire("Done", "Chỉnh sửa thông tin thành công", "success").then(
        () => {
          dispatch(getAllUsers());
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
      title: "Tên",
      dataIndex: "name",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Sđt",
      dataIndex: "phone",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Chức năng",
      dataIndex: "role.name",
      align: "center",
      edittable: true,
      // sorter: (a, b) => a.role.name.localeCompare(b.role.name),
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
  if (currentData.roleId !== "r1"){
    return <div>Không có quyền truy cập</div>
  }
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
