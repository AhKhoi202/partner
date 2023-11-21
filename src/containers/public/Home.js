import React from 'react'
import Header from './Header.js'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
const Home = () => {

  return (
    <div className='w-full flex gap-6 flex-col items-center h-full '>
      <Header/>
      <Navigation/>
      <div className='w-600 flex flex-col items-center justify-start'>
    
      <Outlet/>
      </div>
    </div>
  )
}

export default Home
