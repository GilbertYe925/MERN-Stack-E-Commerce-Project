import {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {useDispatch, useSelector} from "react-redux"
import Message from "../../components/common/Message"
import Loader from "../../components/common/Loader"
import {useCreateOrderMutation} from "../../redux/api/orderApiSlice"
import {clearCartItems, saveShippingAddress, savePaymentMethod} from "../../redux/features/cart/cartSlice"
import {RootState} from "../../redux/store"
import FormInput from "../../components/common/FormInput"


const PlaceOrder = () => {
    const navigate = useNavigate()
    const cart = useSelector((state: RootState) => state.cart)
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const [createOrder, {isLoading, error}] = useCreateOrderMutation()
    
    const [email, setEmail] = useState(userInfo?.email || "")
    const [country, setCountry] = useState(cart.shippingAddress?.country || "")
    const [firstName, setFirstName] = useState(cart.shippingAddress?.firstName || "")
    const [lastName, setLastName] = useState(cart.shippingAddress?.lastName || "")
    const [address, setAddress] = useState(cart.shippingAddress?.address || "")
    const [apartment, setApartment] = useState(cart.shippingAddress?.apartment || "")
    const [city, setCity] = useState(cart.shippingAddress?.city || "")
    const [postalCode, setPostalCode] = useState(cart.shippingAddress?.postalCode || "")
    const [phone, setPhone] = useState(cart.shippingAddress?.phone || "")
    const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod || "Cash On Delivery")
    const [shippingMethod, setShippingMethod] = useState("Standard")

    useEffect(() => {
        if (cart.cartItems.length === 0){
            navigate("/cart")
        }
    }, [navigate, cart.cartItems.length])
    
    // Remove shipping address check since we're collecting it on this page

    const dispatch = useDispatch()
    
    const placeOrderHandler = async () => {
        // Save shipping address before placing order
        dispatch(saveShippingAddress({
            country,
            firstName,
            lastName,
            address,
            apartment,
            city,
            postalCode,
            phone
        }))
        dispatch(savePaymentMethod(paymentMethod))
        
        try {
          const res = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: {
                country,
                firstName,
                lastName,
                address,
                apartment,
                city,
                postalCode,
                phone
            },
            paymentMethod: paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
          }).unwrap();
          dispatch(clearCartItems());
          navigate(`/order/${res._id}`);
        } catch (error: any) {
          toast.error(error.data.message || error.error);
        }
      };

    if (cart.cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <Message variant="danger">Your cart is empty</Message>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-primary pb-20">
            <div className="container mx-auto px-4 pt-8 max-w-6xl">
                {/* Title */}
                <h1 className="text-center text-4xl font-bold mb-8 font-display-sc text-text-primary mt-12">
                    PLACE ORDER
                </h1>

                {/* Order Summary and View Cart Button */}
                <div className="flex justify-between items-start mb-12">
                    <div className="flex flex-col">
                        <div className="text-base text-text-primary mb-2">
                            SUB TOTAL: <span className="font-semibold">${cart.itemsPrice}</span>
                        </div>
                        <div className="text-base text-text-primary mb-2">
                            SHIPPING: <span className="font-semibold">${cart.shippingPrice}</span>
                        </div>
                        <div className="text-lg text-text-primary font-bold">
                            TOTAL: <span>${cart.totalPrice}</span>
                        </div>
                    </div>
                    
                    <Link 
                        to="/cart"
                        className="px-6 py-3 bg-component text-white rounded-[1.5rem] text-sm font-semibold uppercase tracking-wide border border-text-primary hover:bg-white hover:border-text-primary transition-all group"
                    >
                        <span className="group-hover:text-black transition-colors">
                            VIEW YOUR CART
                        </span>
                    </Link>
                </div>

                {error && 'data' in error && (
                    <div className="mb-6">
                        <Message variant="danger">{(error.data as any)?.message || 'An error occurred'}</Message>
                    </div>
                )}

                <form onSubmit={(e) => { e.preventDefault(); placeOrderHandler(); }} className="space-y-8">
                    {/* Account Section */}
                    <div>
                        <h2 className="text-xl font-bold text-text-primary uppercase tracking-wide mb-4">ACCOUNT</h2>
                        <div>
                            <label className="block text-text-primary text-sm mb-2 uppercase">YOUR E MAIL</label>
                            <FormInput
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    {/* Delivery Section */}
                    <div>
                        <h2 className="text-xl font-bold text-text-primary uppercase tracking-wide mb-4">Delivery</h2>
                        
                        {/* Country */}
                        <div className="mb-4">
                            <label className="block text-text-primary text-sm mb-2">Country</label>
                            <FormInput
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                placeholder="Pakistan"
                            />
                        </div>

                        {/* First Name and Last Name */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-text-primary text-sm mb-2">First Name</label>
                                <FormInput
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    placeholder="First Name"
                                />
                            </div>
                            <div>
                                <label className="block text-text-primary text-sm mb-2">Last Name</label>
                                <FormInput
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                            <label className="block text-text-primary text-sm mb-2">Address</label>
                            <FormInput
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                placeholder="Address"
                            />
                        </div>

                        {/* Apartment */}
                        <div className="mb-4">
                            <label className="block text-text-primary text-sm mb-2">Apartment, suite, etc (optional)</label>
                            <FormInput
                                type="text"
                                value={apartment}
                                onChange={(e) => setApartment(e.target.value)}
                                placeholder="Apartment, suite, etc"
                            />
                        </div>

                        {/* City and Postal Code */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-text-primary text-sm mb-2">City</label>
                                <FormInput
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    placeholder="City"
                                />
                            </div>
                            <div>
                                <label className="block text-text-primary text-sm mb-2">Postal Code (optional)</label>
                                <FormInput
                                    type="text"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    placeholder="Postal Code"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="mb-4">
                            <label className="block text-text-primary text-sm mb-2">Phone</label>
                            <FormInput
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder="Phone"
                            />
                        </div>
                    </div>

                    {/* Shipping Method Section */}
                    <div>
                        <h2 className="text-xl font-bold text-text-primary uppercase tracking-wide mb-4">Shipping Method</h2>
                        <button
                            type="button"
                            className={`w-full px-6 py-3 rounded-[1.5rem] text-text-primary border border-text-primary flex items-center justify-between transition-all ${
                                shippingMethod === "Standard" 
                                    ? "bg-component" 
                                    : "bg-white hover:bg-component"
                            }`}
                            onClick={() => setShippingMethod("Standard")}
                        >
                            <span className="font-semibold">Standard</span>
                            <span className="font-semibold">${cart.shippingPrice}</span>
                        </button>
                    </div>

                    {/* Payment Section */}
                    <div>
                        <h2 className="text-xl font-bold text-text-primary uppercase tracking-wide mb-4">Payment</h2>
                        <button
                            type="button"
                            className={`w-full px-6 py-3 rounded-[1.5rem] text-text-primary border border-text-primary flex items-center justify-between transition-all ${
                                paymentMethod === "Cash On Delivery" 
                                    ? "bg-component" 
                                    : "bg-white hover:bg-component"
                            }`}
                            onClick={() => setPaymentMethod("Cash On Delivery")}
                        >
                            <span className="font-semibold">Cash On Delivery</span>
                        </button>
                    </div>

                    {/* Confirm Order Button */}
                    <div className="flex justify-center pt-8">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-text-primary text-white rounded-[1.5rem] text-sm font-semibold uppercase tracking-wide border border-text-primary hover:bg-white hover:border-text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                            disabled={cart.cartItems.length === 0 || isLoading}
                        >
                            <span className="group-hover:text-black transition-colors">
                                {isLoading ? "PROCESSING..." : "CONFIRM ORDER"}
                            </span>
                        </button>
                    </div>

                    {isLoading && <Loader />}
                </form>
            </div>
        </div>
    );
};

export default PlaceOrder;