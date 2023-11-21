import React from 'react'
import { Navigation } from '../public'

const Header = () => {
    return (
        <div className='w-full flex flex-none h-[40px]'>
            
            <div className='flex-auto'>
                <Navigation isAdmin={true} />
            </div>
        </div>
    )
}

export default Header