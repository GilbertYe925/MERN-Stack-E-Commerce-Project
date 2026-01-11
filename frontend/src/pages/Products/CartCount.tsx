import {useSelector} from 'react-redux'
import {RootState} from '../../redux/store'

const CartCount = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)
  const cartCount = cartItems.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0)
  return (
    <>
      {cartCount > 0 && (
        <span className='absolute -top-2 -right-2 text-xs text-white bg-pink-500 rounded-full px-1.5 py-0.5 min-w-[20px] text-center'>
          {cartCount}
        </span>
      )}
    </>
  )
}

export default CartCount

