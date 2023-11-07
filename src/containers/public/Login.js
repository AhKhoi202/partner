import React from 'react'
import { InputForm, Button } from '../../components'
 

const Login = () => {
  return (
    <div className=' w-[750px] bg-white flex  border-2 border-[#1266dd] shadow-xl shadow-[#1266dd]'>
      <div className='bg-white w-2/4 p-[30px] pb-[100px] items-center justify-center '>
        <h3 className='font-semibold text-2xl mb-3'>Đăng nhập</h3>
        <div className='w-full flex flex-col gap-5'>
          <InputForm className = 'bg-white' label={'Tên đăng nhập'}/>
          <InputForm label='Mật khẩu'/>
          <Button
            text={'Đăng nhập'}
            bgColor='bg-secondary1'
            textColor='text-white'
            fullWidth
          />
        </div>
        <div className='mt-7 flex items-center justify-between'>
          <small className='text-[blue] hover:text-[red] cursor-pointer' >Bạn quên mật khẩu</small>
          <small className='text-[blue] hover:text-[red] cursor-pointer' >Tạo tài khoản mới</small>
        </div>
      </div>
      <div className='bg-white w-2/4 p-[30px] pb-[100px]   items-center h-full justify-between right-0 text-right '>
      <h3 className='font-semibold text-2xl mb-3'>WELCOME TO BLUEBOLT</h3>
      
      </div>
    </div>
    
  )
}

export default Login