import React, { useEffect, useState } from "react";
import { apiGetDiscount } from '../../../services/project'
import { Table, } from "antd";


const ReferralBonuses = ({projectId, name}) => {
  const [discountData, setDiscountData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetDiscount(projectId);
        setDiscountData(response.data.response);
      } catch (error) {
        console.error("Error fetching discount:", error);
      }
    };
    fetchData();
  }, [projectId]);

  const column = [
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
      key: "phone",
      title: "Số điện thoại",
      dataIndex: "phone",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.user.phone.localeCompare(b.user.phone),
      render: (text, record) => <span>{record.user.phone}</span>,
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.user.email.localeCompare(b.user.email),
      render: (text, record) => (
        <span>{record.user ? record.user.email : ""}</span>
      ),
    },
    {
      key: "amount",
      title: "Hoa hồng",
      dataIndex: "amount",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      key: "referralLevel",
      title: "Cấp giới thiệu",
      dataIndex: "referralLevel",
      align: "center",
      edittable: true,
      sorter: (a, b) => a.referralLevel - b.referralLevel,
    },
    // {
    //   title: "Hành động",
    //   dataIndex: "action",
    //   align: "center",
    //   render: (_, record) => {
    //     return projects.length >= 1 ? (
    //       <Space>
    //         <Button
    //           type="primary"
    //           className="bg-blue-500"
    //           onClick={() => detailProject(record.id)}
    //         >
    //           Chi tiết
    //         </Button>
    //       </Space>
    //     ) : null;
    //   },
    // },
  ];
  return (
    <div className="w-full h-full flex flex-col xl:p-4 p-2">
      <h1 className="text-3xl pl-4 w-full text-start font-medium">
        {name}
      </h1>
        <Table
          className="rounded-xl max-w-full h-full"
          columns={column}
          dataSource={discountData}
          scroll={{ x: true }}
        />

    </div>
  );
};

export default ReferralBonuses