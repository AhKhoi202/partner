import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../store/actions/user";
import { Table, Popconfirm, Button, Space, Input, Form } from "antd";
import { apiDeleteCustomers, apiEditCustomers } from "../../services";

const ListCustomers = () => {
  const { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm()


  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const handleDelete = async (customers) => {
    const response = await apiDeleteCustomers(customers.id);
    if (response?.data.err === 0) {
      dispatch(getCustomers());
    } else {
      alert(response.err);
    }
    console.log(response);
  };
  
  const edit = (record) => {
    form.setFieldsValue({
      id:record.id,
      ...record,
    });
    setEditingKey(record.id);
  };
  
  const save = async (id) => {
    
    const row = await form.validateFields();
    console.log(row)
    const response = await apiEditCustomers(row);
    if (response?.data.err === 0) {
      edit(false)
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
              message: `vui long nhap ${title}`
            }
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
      title: "Mo ta cong viec",
      dataIndex: "note",
      align: "center",
      edittable: true,
    },
    {
      title: "Hanh dong",
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
        ): null
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

export default ListCustomers;
