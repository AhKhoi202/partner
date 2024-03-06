import React, { useState, useEffect } from "react";
import { getPaymentPartnerByMonth, getPaymentPartner } from "../../../services";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../../ultils/formatCurrency";
import { Select } from "antd";
import moment from "moment"; // Đầu file
const { Option } = Select;

const PaidStatistics = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [yearlyRevenue, setYearlyRevenue] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Năm mặc định là năm hiện tại
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Tháng mặc định là tháng hiện tại

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressResponse = await getPaymentPartner(selectedYear);
        const dataFromAPI = progressResponse?.data?.monthlyRevenue?.data;

        // Tạo mảng mới với 12 tháng, giá trị mặc định là 0
        let preparedData = Array.from({ length: 12 }, (_, i) => ({
          month: i + 1,
          totalPay: 0,
        }));
        // Biến tạm để tính tổng totalPay
        let yearlyTotalPay = 0;
        // Điền dữ liệu từ API vào mảng
        dataFromAPI.forEach((data) => {
          if (data.month > 0) {
            // Loại bỏ dữ liệu tháng 0 nếu có
            preparedData[data.month - 1].totalPay = data.totalPay;
            yearlyTotalPay += data.totalPay;
          }
        });
        setMonthlyRevenue(preparedData);
        console.log(yearlyTotalPay);
        setYearlyRevenue(yearlyTotalPay);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    fetchProgress();
  }, [selectedYear]);
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28DFF",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#E7E9ED",
    "#4BC0C0",
    "#99A3A4",
    "#605ca8",
  ];

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const years = Array.from(
    { length: new Date().getFullYear() - 2020 + 1 },
    (_, index) => new Date().getFullYear() - index
  );
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  useEffect(() => {
    const fetchPaymentProjectByMonth = async () => {
      try {
        const response = await getPaymentPartnerByMonth(
          selectedMonth,
          selectedYear
        );
        // Xử lý dữ liệu response ở đây
        setPaymentInfo(response.data.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    fetchPaymentProjectByMonth();
  }, [selectedMonth, selectedYear]);
  console.log(paymentInfo);
  return (
    <div className="h-full  md:mx-4 my-8">
      <div className="flex text-xl p-2">
        <h1 className="pr-2">Thống kê</h1>
        <Select
          value={selectedYear}
          style={{ width: 120 }}
          onChange={handleYearChange}
        >
          {/* Tạo options cho năm từ 2000 đến năm hiện tại */}
          {years.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2  p-2 ">
          <div className="flex mb-2 p-2 bg-white">
            <h1 className="pr-2"> Danh sách hóa đơn nhận tiền theo tháng</h1>{" "}
            <Select
              value={selectedMonth}
              style={{ width: 120 }}
              onChange={handleMonthChange}
            >
              {/* Tạo options cho tháng từ 1 đến 12 */}
              {months.map((month) => (
                <Option key={month} value={month}>
                  {month}
                </Option>
              ))}
            </Select>
          </div>

          {paymentInfo.length === 0 ? (
            <div className="mb-2 p-2 bg-white">
              <p>Không có hóa đơn</p>
            </div>
          ) : (
            paymentInfo.map((payment, index) => (
              <div className="mb-2 p-2 bg-white" key={index}>
                <h1>Tên người nhận: {payment.referralBonuses.user.name}</h1>
                <h1>Tên dự án: {payment.referralBonuses.project.name}</h1>
                <h1>Cấp partner: {payment.referralBonuses.referralLevel}</h1>
                <h1>Tên giai đoạn: {payment.description}</h1>
                <p>
                  Ngày nhận: {moment(payment.paymentDate).format("DD/MM/YYYY")}
                </p>
                <p>Số tiền: {formatCurrency(payment.paid)}</p>
                <p>
                  Trạng thái dự án: {payment.referralBonuses.project.status}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="w-full md:w-1/2 m-2 p-2 h-full bg-white">
          <h1>
            {" "}
            Biểu đồ trả chiết khấu cho partner theo tháng trong năm{" "}
            {selectedYear} với tổng chi {formatCurrency(yearlyRevenue)} vnđ
          </h1>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="totalPay" name="Tháng">
                {monthlyRevenue.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PaidStatistics;
