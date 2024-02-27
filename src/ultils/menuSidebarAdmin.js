import icons from './icons'

const { FiUsers, AiOutlineUsergroupAdd } = icons;
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
];

export default menuSidebarAdmin