import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { useGetProductsQuery } from '../../redux/api/productApiSlice'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { toast } from 'react-toastify'
import Loader from '../common/Loader'
import buttonsImage from '../../public/buttons.png'

const NewArrivals = () => {
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

  const newProducts = data?.products?.slice(0, 8) || []

  return (
    <section className="w-full h-screen bg-[#7B7B7B] flex items-start pt-[6rem]">
      <div className="max-w-[90rem] mx-auto w-full">
        <h2 className="text-[4rem] text-black font-normal text-center mb-[10rem] text-shadow-default">
          New Arrival
        </h2>
        
        <div className="flex justify-center gap-[10rem] px-[2rem]">
          {newProducts.map((product: any, index: number) => (
            <div key={product._id || index} className="flex flex-col">
              <div className="relative w-[21rem] h-[21rem] overflow-hidden rounded-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex flex-col gap-[0.5rem] bg-[#C5B7AC] p-[1rem] rounded-lg">
                <h3 className="text-[2rem] text-black font-normal">
                  {product.name}
                </h3>
                
                {/* Color swatches - for some products */}
                {index >= 4 && index < 7 && (
                  <div className="flex gap-[0.5rem] mt-[0.5rem]">
                    <div className="w-[2rem] h-[2rem] rounded-full bg-[#AB19E5]" />
                    <div className="w-[2rem] h-[2rem] rounded-full bg-[#006710]" />
                  </div>
                )}
                
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

export default NewArrivals
