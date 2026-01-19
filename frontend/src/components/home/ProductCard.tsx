import { Link } from 'react-router-dom'
import { scrollToTop } from '../../hooks/useScrollToTop'

interface ProductCardProps {
  product: any
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleClick = () => {
    // Scroll to top immediately before navigation to prevent flashing
    scrollToTop()
  }

  return (
    <Link 
      to={`/product/${product._id}`}
      onClick={handleClick}
      className="flex flex-col bg-white rounded-[0.5rem] p-[1.5rem] w-[24rem] cursor-pointer"
    >
      <div
        className="relative w-[21rem] h-[21rem] mx-auto mb-[1rem] overflow-hidden rounded-[0.5rem] 
          flex-shrink-0"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <h3 className="text-[1.25rem] text-black font-normal">
          {product.name}
        </h3>
        <p className="text-[1rem] font-normal playfair-display">
          {product.brand}
        </p>
        <p className="text-[1rem] font-normal">
          ${product.price?.toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
