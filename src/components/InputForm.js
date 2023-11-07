import React, { memo } from 'react'

const InputForm = ({ label, value, setValue, keyPayload, invalidFields, setInvalidFields, type }) => {
  return (
    <div>
    <label htmlFor={keyPayload} for="myInput" className=' text-base ' >{label}</label>
    <input
        type={type || 'text'}
        id="myInput"
        className='outline-none bg-transparent p-2  w-full border-b-4 border-[#1266dd] focus:outline-none'
      />
</div>
  )
}

export default  memo(InputForm)