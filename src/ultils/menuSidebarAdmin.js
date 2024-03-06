import icons from "./icons";

const { FiUsers, AiOutlineUsergroupAdd, FcStatistics } = icons;
const menuSidebarAdmin = [
  {
    id: 1,
    text: "Partner",
    path: "/he-thong/ds-partner",
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    id: 2,
    text: "Khách hàng ",
    path: "/he-thong/ds-tat-ca-khach-hang",
    icon: <FiUsers />,
  },
  {
    id: 3,
    text: "Dự án",
    path: "/he-thong/ds-du-an",
    icon: <FiUsers />,
  },
  {
    id: 4,
    text: "Thống kê dự án",
    path: "/he-thong/revenue-statistics",
    icon: <FcStatistics />,
  },
  {
    id: 5,
    text: "Thống kê partner",
    path: "/he-thong/paid-statistics",
    icon: <FcStatistics />,
  },
];

export default menuSidebarAdmin;
