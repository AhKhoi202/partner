import icons from './icons'

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin } = icons

const menuManage = [
    
    {
        id: 1,
        text: 'Quản lý khach hang',
        path: '/he-thong/quan-ly-khach-hang',
        icon: <MdOutlineLibraryBooks />
    },
    {
        id: 2,
        text: 'Thông tin tài khoản',
        path: '/he-thong/thong-tin-tai-khoan',
        icon: <BiUserPin />
    },
    
]

export default menuManage