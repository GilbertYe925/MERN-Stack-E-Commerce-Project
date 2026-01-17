import { useGetProductsQuery } from '../../redux/api/productApiSlice'
import Loader from '../common/Loader'
import ProductCard from './ProductCard'

const FeaturedProducts = () => {
  const { data, isLoading } = useGetProductsQuery({ pageNumber: 1 })

  if (isLoading) return <Loader />

  const featuredProducts = data?.products?.slice(0, 4) || []

  return (
    <section
      className="w-full h-screen bg-primary flex items-start pt-[7rem] overflow-x-hidden"
    >
      <div className="max-w-[90rem] mx-auto w-full">
        <h2
          className="text-[3.75rem] text-black font-normal text-center 
            mb-[12rem] text-shadow-default"
        >
          Featured Products
        </h2>

        <div
          className="flex justify-center items-start gap-[3rem] px-[2rem]"
        >
          {featuredProducts.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
