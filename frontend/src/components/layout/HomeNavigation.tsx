import { Link } from 'react-router-dom'
import { FaSearch, FaUser } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import CartCount from '../products/CartCount'
import { useState } from 'react'
import buttonsImage from '../../public/buttons.png'

const HomeNavigation = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  return (
    <nav className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-[84rem] 
      h-[5.5rem] z-50 opacity-50">
      <div className="w-full h-full bg-white/50 backdrop-blur-sm border-[0.125rem] 
        border-[#333333] rounded-[1.5rem] flex items-center justify-between 
        px-[2.5rem] py-[1.75rem]">
        {/* Left side - Navigation Links */}
        <div className="flex items-center gap-[2rem]">
          <Link to="/" className="text-[1.25rem] leading-[1.75rem] text-black font-normal 
            hover:opacity-80 transition-opacity">
            Home
          </Link>
          
          <div className="relative">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center gap-[0.5rem] text-[1.25rem] leading-[1.75rem] 
                text-black font-normal hover:opacity-80 transition-opacity"
            >
              Categories
              <IoIosArrowDown 
                className={`w-[1.875rem] h-[1.875rem] transition-transform 
                  ${categoriesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {categoriesOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-[0.5rem] 
                shadow-dropdown p-4 min-w-[12rem] z-50">
                <Link to="/shop" className="block py-2 hover:opacity-80">All Products</Link>
                <Link to="/shop" className="block py-2 hover:opacity-80">Rings</Link>
                <Link to="/shop" className="block py-2 hover:opacity-80">Necklaces</Link>
                <Link to="/shop" className="block py-2 hover:opacity-80">Earrings</Link>
              </div>
            )}
          </div>
          
          <Link to="/contact" className="text-[1.25rem] leading-[1.75rem] text-black font-normal 
            hover:opacity-80 transition-opacity">
            Contact Us
          </Link>
        </div>

        {/* Right side - Icons */}
        <div className="flex items-center gap-[1.5rem]">
          <Link to="/shop" className="group w-[3rem] h-[3rem] rounded-full bg-white 
            border border-text-primary flex items-center justify-center hover:bg-text-primary 
            transition-all">
            <FaSearch className="w-[1.5rem] h-[1.5rem] text-text-primary 
              group-hover:text-white transition-colors" />
          </Link>
          
          <Link to="/profile" className="group w-[3rem] h-[3rem] rounded-full bg-white 
            border border-text-primary flex items-center justify-center hover:bg-text-primary 
            transition-all">
            <FaUser className="w-[1.5rem] h-[1.5rem] text-text-primary 
              group-hover:text-white transition-colors" />
          </Link>
          
          <Link to="/cart" className="group relative w-[3rem] h-[3rem] rounded-full bg-white 
            border border-text-primary flex items-center justify-center hover:bg-text-primary 
            transition-all overflow-hidden">
            <img 
              src={buttonsImage} 
              alt="Shopping cart" 
              className="w-full h-full object-cover invert group-hover:invert-0 transition-all"
            />
            <CartCount />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default HomeNavigation
