import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useLogoutMutation} from '../../redux/api/usersApiSlice'
import {logout} from '../../redux/features/auth/authSlice'
import { RootState } from '../../redux/store'
import FavoritesCount from '../../components/products/FavoritesCount'
import CartCount from '../../components/products/CartCount'

const Navigation = () => {

    const userInfo = useSelector((state: RootState) => state.auth.userInfo)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()
    const logoutHandler = async () => {
        try {
            await logoutApiCall(undefined).unwrap()
            dispatch(logout())
            navigate('/auth')
        } catch (err) {
            console.error(err)
        }
    }


  return (
    <nav 
    className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center px-4 md:px-6 lg:px-10 
    py-2 md:py-3 text-text-primary bg-bg-primary h-20 shadow-nav z-[1000]"
    id="navigation-container">
    
    {/* Left side - Main Navigation */}
    <div className="flex flex-row items-center space-x-4 md:space-x-6 lg:space-x-8">
        <Link to="/" className="cursor-pointer">
            <div className="w-16 h-14 md:w-16 md:h-12 lg:w-24 lg:h-18 bg-black rounded-lg 
              flex items-center justify-center">
                <span className="text-white text-[0.625rem] md:text-[0.75rem] font-bold">Logo</span>
            </div>
        </Link>
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <span className="text-sm md:text-base">Home</span>
        </Link>
        <Link to="/shop" className="flex items-center hover:opacity-80 transition-opacity">
            <span className="text-sm md:text-base">Shop</span>
        </Link>
        <Link to="/cart" className="flex items-center hover:opacity-80 transition-opacity relative">
            <span className="text-sm md:text-base">Cart</span>
            <CartCount/>
        </Link>
        <Link to="/favorite" className="flex items-center hover:opacity-80 transition-opacity relative">
            <span className="text-sm md:text-base hidden sm:inline">Favorite</span>
        </Link>
        <Link to="/contact" className="flex items-center hover:opacity-80 transition-opacity">
            <span className="text-sm md:text-base hidden md:inline">Contact</span>
        </Link>
    </div>

    {/* Right side - User menu */}
    <div className='relative'>
        {userInfo ? (
            <>
                <button 
                    onClick={toggleDropdown} 
                    className='flex items-center space-x-1 md:space-x-2 focus:outline-none 
                      hover:opacity-80 transition-opacity'
                >
                    <span className='text-sm md:text-base'>{userInfo.username}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3 w-3 md:h-4 md:w-4 ${
                            dropdownOpen ? "transform rotate-180" : ""
                        } transition-transform`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                        />
                    </svg>
                </button>
                {dropdownOpen && (
                    <ul 
                        className="absolute top-full right-0 mt-2 space-y-1 md:space-y-2 bg-white 
                        text-gray-600 rounded-md shadow-dropdown py-1 md:py-2 min-w-[140px] 
                        md:min-w-[180px] z-50 text-sm md:text-base"
                    >
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link 
                                        to="/admin/dashboard" 
                                        className="block px-3 md:px-4 py-1.5 md:py-2 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/productlist/1" 
                                        className="block px-3 md:px-4 py-1.5 md:py-2 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/categorylist" 
                                        className="block px-3 md:px-4 py-1.5 md:py-2 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Category
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/orderlist" 
                                        className="block px-3 md:px-4 py-1.5 md:py-2 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/userlist" 
                                        className="block px-3 md:px-4 py-1.5 md:py-2 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Users
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link 
                                to="/profile" 
                                className="block px-3 md:px-4 py-1.5 md:py-2 hover:bg-gray-100"
                                onClick={() => setDropdownOpen(false)}
                            >
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="#" 
                                onClick={(e) => {
                                    e.preventDefault()
                                    logoutHandler()
                                    setDropdownOpen(false)
                                }}
                                className="block px-3 md:px-4 py-1.5 md:py-2 hover:bg-gray-100"
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                )}
            </>
        ) : (
            <div className="flex items-center space-x-2 md:space-x-4">
                <Link 
                    to="/auth" 
                    className="flex items-center hover:opacity-80 transition-opacity"
                >
                    <span className="text-sm md:text-base">Login</span>
                </Link>
            </div>
        )}
    </div>
    
    </nav>
  )
}

export default Navigation
