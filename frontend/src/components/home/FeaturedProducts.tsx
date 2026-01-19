import { useGetProductsQuery } from '../../redux/api/productApiSlice'
import Loader from '../common/Loader'
import ProductCard from './ProductCard'

const FeaturedProducts = () => {
  const { data, isLoading } = useGetProductsQuery({ pageNumber: 1 })

  if (isLoading) return <Loader />

  const featuredProducts = data?.products?.slice(0, 4) || []

  return (
    <section
      data-section-id="featured"
      data-height-type="reduced"
      className="w-full bg-primary flex items-start pt-[3rem] overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto w-full">
        <h2
          className="text-[2.5rem] text-black font-normal text-center 
            mb-[3rem] text-shadow-default"
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
