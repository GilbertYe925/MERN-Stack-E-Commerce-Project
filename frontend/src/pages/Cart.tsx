import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { RootState } from "../redux/store";
import EmptyState from "../components/common/EmptyState";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product: any, quantity: number) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/placeorder");
  };

  const totalItems = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc: number, item: any) => acc + item.quantity * item.price, 0);

  return (
    <div className="min-h-screen bg-primary pb-20">
      <div className="container mx-auto px-4 pt-8 max-w-4xl">
        {cartItems.length === 0 ? (
          <EmptyState 
            title="Your cart is empty" 
            message="Go to shop to add items" 
          />
        ) : (
          <>
            {/* Title */}
            <h1 className="text-center text-4xl font-bold mb-8 font-display-sc text-text-primary">
              MY CART
            </h1>

            {/* Cart Items */}
            <div className="space-y-0 mb-8">
              {cartItems.map((item: any, index: number) => (
                <div key={item._id}>
                  <div className="flex items-start gap-4 py-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-text-primary uppercase tracking-wide">
                          {item.name}
                        </h3>
                        <p className="text-base text-text-primary mt-2">
                          Quantity : {String(item.quantity).padStart(2, '0')}
                        </p>
                        <p className="text-base text-text-primary font-semibold mt-1">
                          ${item.price}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        className="px-6 py-2 bg-text-primary text-white rounded-[1.5rem] text-sm font-semibold uppercase tracking-wide self-start mt-2 border border-text-primary hover:bg-white hover:border-text-primary transition-all group"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <span className="group-hover:text-black transition-colors">
                          REMOVE
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Separator Line */}
                  {index < cartItems.length - 1 && (
                    <div className="border-t border-component"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-component py-6 px-6 flex justify-between items-center">
              <div className="text-base font-semibold text-text-primary uppercase tracking-wide">
                {totalItems} ITEM{totalItems !== 1 ? 'S' : ''} ${subtotal.toFixed(2)}
              </div>
              
              <button
                className="px-8 py-3 bg-text-primary text-white rounded-[1.5rem] text-sm font-semibold uppercase tracking-wide border border-text-primary hover:bg-white hover:border-text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                <span className="group-hover:text-black transition-colors">
                  PLACE ORDER
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;