import React from 'react'


const Button = ({text, textColor, bgColor, IcAfter, onClick, fullWidth, px}) => {
  return (
    <button
      type='button'
      className={`py-2 px-4 ${textColor} ${bgColor} ${fullWidth && 'w-full'} border-2 border-[#1266dd] outline-none rounded-full flex items-center justify-center gap-1`}        
      onClick={onClick}
    >
        {text}
        {IcAfter && <span> <IcAfter/></span>}
    </button>
  )
}

export default Button