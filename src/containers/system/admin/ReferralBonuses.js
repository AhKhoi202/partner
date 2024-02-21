import React, { useEffect, useState } from "react";
import {
  apiEditDiscount,
  apiGetDiscountByProjectId,
} from "../../../services/project";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Table, Button, Space, Popconfirm, Input, Form } from "antd";

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
              message: `Vui lòng nhập ${title}`,
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

const ReferralBonuses = (project) => {
  const [form] = Form.useForm();
  const [discountData, setDiscountData] = useState(null);
  const [editingKey, setEditingKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetDiscountByProjectId(project.project.id);
        console.log(response);
        setDiscountData(response.data.response);
      } catch (error) {
        console.error("Error fetching discount:", error);
      }
    };
    fetchData();
  }, [project.project.id]);
  const actualRevenue = project.project.actualRevenue;

  const isEditing = (record) => {
    return record.id === editingKey;
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
    row.totalAmount = (actualRevenue * row.amount) / 100; ///////////////////////////////////////
    console.log(row);
    const response = await apiEditDiscount(row);
    console.log(response);
    if (response?.data.err === 0) {
      const updatedDiscountData = discountData.map((item) =>
        item.id === id ? { ...item, ...row } : item
      );
      setDiscountData(updatedDiscountData);
      edit(false);
      Swal.fire("Done", "Chỉnh sửa chiết khấu thành công", "success").then(
        () => {}
      );
    } else {
      Swal.fire("Oops!", "Chỉnh sửa chiết khấu không thành công", "error");
    }
  };

  const payment = async (id) => {
    console.log(id);
    navigate(`/he-thong/payment-partner?${id}`);
  };

  const column = [
    {
      key: "name",
      title: "Tên partner",
      dataIndex: "name",
      align: "center",

      sorter: (a, b) => a.user.name.localeCompare(b.user.name),
      render: (text, record) => <span>{record.user.name}</span>,
    },
    {
      key: "phone",
      title: "Số điện thoại",
      dataIndex: "phone",
      align: "center",

      sorter: (a, b) => a.user.phone.localeCompare(b.user.phone),
      render: (text, record) => <span>{record.user.phone}</span>,
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      align: "center",

      sorter: (a, b) => a.user.email.localeCompare(b.user.email),
      render: (text, record) => (
        <span>{record.user ? record.user.email : ""}</span>
      ),
    },
    {
      key: "totalAmount",
      title: "Hoa hồng",
      dataIndex: "totalAmount",
      align: "center",
      sorter: (a, b) => a.amount - b.amount,
      render: (text, record) => (
        <span>{(actualRevenue * record.amount) / 100}</span>
      ),
    },
    {
      key: "amount",
      title: "Chiết khấu %",
      dataIndex: "amount",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.amount - b.amount,
      render: (text, record) => <span>{record.amount}%</span>,
    },
    {
      key: "referralLevel",
      title: "Cấp giới thiệu",
      dataIndex: "referralLevel",
      align: "center",

      sorter: (a, b) => a.referralLevel - b.referralLevel,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return discountData.length >= 1 ? (
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
                  <Button onClick={() => edit(record)}>
                    Thay đổi chiết khấu
                  </Button>
                  <Button
                    type="primary"
                    className="bg-blue-500"
                    onClick={() => payment(record.id)}
                  >
                    Thanh toán
                  </Button>
                </Space>
              </span>
            )}
          </Space>
        ) : null;
      },
    },
  ];
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

  const confirm = async (discountData) => {
    console.log(discountData);
    // window.location.href = "/he-thong/ds-du-an";
  };
  return (
    <div className="w-full h-full flex flex-col xl:p-4 p-2">
      <h1 className="text-3xl p-4 w-full text-start font-medium">
        Chiết khấu cho dự án: {project.project.name}
      </h1>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditTableCell,
            },
          }}
          className="rounded-xl max-w-full h-full"
          columns={mergedColumns}
          dataSource={discountData}
          scroll={{ x: true }}
        />
        <Button
          className="w-20 mr-10 ml-auto bg-blue-600 hover:text-white text-white "
          onClick={() => confirm(discountData)}
        >
          Xác nhận
        </Button>
      </Form>
    </div>
  );
};

export default ReferralBonuses;
