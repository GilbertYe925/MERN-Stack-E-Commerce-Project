import { Link } from 'react-router-dom'
import { useGetProductsQuery } from '../../redux/api/productApiSlice'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { toast } from 'react-toastify'
import Loader from '../common/Loader'
import buttonsImage from '../../public/buttons.png'

const FeaturedProducts = () => {
  const { data, isLoading } = useGetProductsQuery({ pageNumber: 1 })
  const dispatch = useDispatch()

  const addToCartHandler = (product: any) => {
    dispatch(addToCart({ ...product, quantity: 1 }))
    toast.success("Item added successfully", {
      position: "top-right",
      autoClose: 2000,
    })
  }

  if (isLoading) return <Loader />

  const featuredProducts = data?.products?.slice(0, 4) || []

  return (
    <section className="w-full h-screen bg-[#CCCCCC] flex items-start pt-[6rem]">
      <div className="max-w-[90rem] mx-auto w-full">
        <h2 className="text-[4rem] text-black font-normal text-center mb-[10rem] text-shadow-default">
          Featured Products
        </h2>
        
        <div className="flex justify-center items-start gap-[10rem] px-[2rem]">
          {featuredProducts.map((product: any) => (
            <div key={product._id} className="flex flex-col">
              <div className="relative w-[21rem] h-[21rem] mb-[1rem] overflow-hidden rounded-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex flex-col gap-[0.5rem]">
                <h3 className="text-[2rem] text-black font-normal">
                  {product.name || 'CRTR Premium Bangle'}
                </h3>
                <p className="text-[1.5rem] leading-[2rem] text-[#333333] font-normal playfair-display">
                  {product.brand || 'Stainless steel'}
                </p>
                <div className="flex items-center justify-between mt-[0.5rem]">
                  <p className="text-[2rem] leading-[2.5rem] text-black font-normal">
                    ${product.price?.toFixed(2) || '120.00'}
                  </p>
                  <button 
                    onClick={() => addToCartHandler(product)}
                    className="w-[3rem] h-[3rem] rounded-full overflow-hidden transition-all"
                  >
                    <img 
                      src={buttonsImage} 
                      alt="Add to cart" 
                      className="w-full h-full object-cover hover:invert transition-all"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
