import React from 'react'
import { useSelector } from "react-redux";


const User = () => {
  const { currentData } = useSelector(state => state.user)
 

  return (
    <div className='flex items-center gap-2'>
    <div className='flex flex-col'>
        <span>Xin chào, <span className='font-semibold'>{currentData?.name}</span></span>
        <span>Mã tài khoản: <span className='font-medium'>{currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}</span></span>
    </div>
    </div>
  )
}

export default User