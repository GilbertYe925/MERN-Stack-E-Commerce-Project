import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {FaTimes} from 'react-icons/fa'

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }


    return (
        <div>
            <button 
            className={`${isMenuOpen ? "top-2 right-2" : "top-5 right-7"} bg-[#151515] p-2 fixed rounded-lg`} 
            onClick={toggleMenu}>
                {isMenuOpen ? (<FaTimes className="text-white text-2xl" /> )
                : (
                    <>
                    <div className="w-6 h-0.5 bg-white my-1">
                    </div>
                    <div className="w-6 h-0.5 bg-white my-1">
                    </div>
                    <div className="w-6 h-0.5 bg-white my-1">
                    </div>
                    </>
                )}
            </button>
            {isMenuOpen && (
                <section className="bg-[#151515] p-4 fixed right-7 top-5">
                    <ul className="list-none mt-2">
                        <li>
                            <NavLink 
                            to="/admin/dashboard" 
                            className={({isActive}) => `list-item py-2 px-3 block mb-5 hover:bg-white hover:text-[#2E2D2D]
                             rounded-sm ${isActive ? 'text-greenyellow' : 'text-white'}`}>
                                Admin Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                            to="/admin/categorylist" 
                            className={({isActive}) => `list-item py-2 px-3 block mb-5 hover:bg-white hover:text-[#2E2D2D]
                             rounded-sm ${isActive ? 'text-greenyellow' : 'text-white'}`}>
                                Create Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                            to="/admin/productlist/1" 
                            className={({isActive}) => `list-item py-2 px-3 block mb-5 hover:bg-white hover:text-[#2E2D2D]
                             rounded-sm ${isActive ? 'text-greenyellow' : 'text-white'}`}>
                                Create Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                            to="/admin/allproducts" 
                            className={({isActive}) => `list-item py-2 px-3 block mb-5 hover:bg-white hover:text-[#2E2D2D]
                             rounded-sm ${isActive ? 'text-greenyellow' : 'text-white'}`}>
                                All Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                            to="/admin/userlist" 
                            className={({isActive}) => `list-item py-2 px-3 block mb-5 hover:bg-white hover:text-[#2E2D2D]
                             rounded-sm ${isActive ? 'text-greenyellow' : 'text-white'}`}>
                                Manage Users
                            </NavLink>
                        </li>                        <li>
                            <NavLink 
                            to="/admin/orderlist" 
                            className={({isActive}) => `list-item py-2 px-3 block mb-5 hover:bg-white hover:text-[#2E2D2D]
                             rounded-sm ${isActive ? 'text-greenyellow' : 'text-white'}`}>
                                Manage Orders
                            </NavLink>
                        </li>
                    </ul>
                </section>
            )}
        </div>
    )
}

export default AdminMenu