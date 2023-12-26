import icons from "./icons";

const { LuUserCog, FiUser } = icons;

const memuSidebar = [
  {
    id: 1,
    text: "Sửa thông tin cá nhân",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <LuUserCog />,
  },
  {
    id: 2,
    text: "DS khách hàng giới thiệu",
    path: "/he-thong/ds-khach-hang",
    icon: <FiUser />,
  },
];

export default memuSidebar