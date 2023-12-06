import React from 'react'

const RowEditTable = () => {
  return (
    <tr>
        <td>
            <input
            type = 'text'
            required='requied'
            placeholder='Nhap ten khach hang...'
            name='name'
            />
        </td>
        <td>
            <input
            type = 'text'
            required='requied'
            placeholder='Nhap sdt khach hang...'
            name='phone'
            />
        </td>
        <td>
            <input
            type = 'text'
            required='requied'
            placeholder='Nhap email khach hang...'
            name='email'
            />
        </td>
        <td>
            <input
            type = 'text'
            required='requied'
            placeholder='Mo ta cong viec...'
            name='note'
            />
        </td>
    </tr>
  )
}

export default RowEditTable