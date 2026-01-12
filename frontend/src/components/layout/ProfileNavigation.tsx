import React from 'react'
import {Link} from 'react-router-dom'

const ProfileNavigation = () => {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center px-10 py-16
      text-text-primary bg-bg-primary h-16"
      style={{zIndex: 1000}}
    >
      {/* Left side - Navigation */}
      <div className="flex flex-row items-center space-x-6">
        <Link to="/" className="cursor-pointer">
          <div className="w-32 h-20 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">Logo</span>
          </div>
        </Link>
        <Link to="/shop" className="flex ml-10 w-20 items-center hover:opacity-80 transition-opacity">
          <span className="text-lg">Shop</span>
        </Link>
        <Link to="/user-orders" className="flex w-10 items-center hover:opacity-80 transition-opacity">
          <span className="text-lg">Orders</span>
        </Link>
      </div>
    </nav>
  )
}

export default ProfileNavigation
