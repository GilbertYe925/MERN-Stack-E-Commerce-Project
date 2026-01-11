import React from 'react'
import {useState} from 'react'
import {AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineShoppingCart} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useLogoutMutation} from '../../redux/api/usersApiSlice'
import {logout} from '../../redux/features/auth/authSlice'
import { RootState } from '../../redux/store'
import FavoritesCount from '../Products/FavoritesCount'
import CartCount from '../Products/CartCount'

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
    style={{zIndex: 1000}} 
    className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center px-6 py-4 
    text-text-primary bg-bg-primary h-16 shadow-md"
    id="navigation-container">
    
    {/* Left side - Main Navigation */}
    <div className="flex flex-row items-center space-x-6">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <AiOutlineHome className="text-2xl" />
            <span className="text-lg">Home</span>
        </Link>
        <Link to="/shop" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <AiOutlineShopping className="text-2xl" />
            <span className="text-lg">Shop</span>
        </Link>
        <Link to="/cart" className="flex items-center space-x-2 hover:opacity-80 transition-opacity relative">
            <AiOutlineShoppingCart className="text-2xl" />
            <span className="text-lg">Cart</span>
            <CartCount/>
        </Link>
        <Link to="/favorite" className="flex items-center space-x-2 hover:opacity-80 transition-opacity relative">
            <FaHeart className="text-2xl" />
            <span className="text-lg">Favorite</span>
            <FavoritesCount/>
        </Link>
    </div>

    {/* Right side - User menu */}
    <div className='relative'>
        {userInfo ? (
            <>
                <button 
                    onClick={toggleDropdown} 
                    className='flex items-center space-x-2 focus:outline-none hover:opacity-80 transition-opacity'
                >
                    <span className='text-lg'>{userInfo.username}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${
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
                        className="absolute top-full right-0 mt-2 space-y-2 bg-white 
                        text-gray-600 rounded-md shadow-lg py-2 min-w-[180px] z-50"
                    >
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link 
                                        to="/admin/dashboard" 
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/productlist/1" 
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/categorylist" 
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Category
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/orderlist" 
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/userlist" 
                                        className="block px-4 py-2 hover:bg-gray-100"
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
                                className="block px-4 py-2 hover:bg-gray-100"
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
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                )}
            </>
        ) : (
            <div className="flex items-center space-x-4">
                <Link 
                    to="/auth" 
                    className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                >
                    <AiOutlineLogin className="text-2xl" />
                    <span className="text-lg">Login</span>
                </Link>
            </div>
        )}
    </div>
    
    </nav>
  )
}

export default Navigation
