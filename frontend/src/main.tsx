import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Route, RouterProvider, createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.ts'

import Profile from './pages/User/Profile.tsx'
import Home from './pages/Home.tsx'
//private route
import PrivateRoute from './components/PrivateRoute.tsx'

//auth
import Auth from './pages/Auth/Auth.tsx'

//Admin Routes
import AdminRoute from './pages/Admin/AdminRoute.tsx'
import UserList from './pages/Admin/UserList.tsx'
import CategoryList from './pages/Admin/CategoryList.tsx'
import ProductList from './pages/Admin/ProductList.tsx'
import ProductUpdate from './pages/Admin/ProductUpdate.tsx'
import AllProducts from './pages/Admin/AllProducts.tsx'
import Favorites from './pages/Products/Favorites.tsx'
import ProductDetails from './pages/Products/ProductDetails.tsx'
import Cart from './pages/Cart.tsx'
import Shop from './pages/Shop.tsx'
import Shipping from './pages/Orders/Shipping.tsx'
import PlaceOrder from './pages/Orders/PlaceOrder.tsx'
import Order from './pages/Orders/Order.tsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import UserOrder from './pages/User/UserOrder.tsx'
import OrderList from './pages/Admin/OrderList.tsx'
import AdminDashboard from './pages/Admin/AdminDashboard.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="/auth" element={<Auth />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/user-orders" element={<UserOrder />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/" element={<PrivateRoute />} >
        <Route path='/profile' element={<Profile />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/order/:id' element={<Order />} />
      </Route>

      {/* Admin Route */}
      <Route path="/admin" element={<AdminRoute />} >
        <Route path="/admin/userlist" element={<UserList />} />
        <Route path="/admin/categorylist" element={<CategoryList />} />
        <Route path="/admin/productlist/:pageNumber" element={<ProductList />} />
        <Route path="/admin/product/update/:id" element={<ProductUpdate />} />
        <Route path="/admin/allproducts" element={<AllProducts />} />
        <Route path="/admin/orderlist" element={<OrderList />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <PayPalScriptProvider options={{ clientId: "test" }}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
      
  </Provider>

)
