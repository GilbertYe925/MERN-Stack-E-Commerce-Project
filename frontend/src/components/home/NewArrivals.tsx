import { useGetProductsQuery } from '../../redux/api/productApiSlice'
import Loader from '../common/Loader'
import ProductCard from './ProductCard'

const NewArrivals = () => {
  const { data, isLoading } = useGetProductsQuery({ pageNumber: 1 })

  if (isLoading) return <Loader />

  const newProducts = data?.products?.slice(0, 8) || []

  const hasMultipleRows = newProducts.length > 4

  return (
    <section
      data-section-id="new-arrival"
      data-height-type="base"
      className={`w-full bg-component flex items-start pt-[3rem] overflow-hidden ${hasMultipleRows ? 'double-row-section' : ''}`}
    >
      <div className="max-w-[120rem] mx-auto w-full">
        <h2
          className="text-[2.5rem] text-black font-normal text-center mb-[3rem] text-shadow-default"
        >
          New Arrival
        </h2>

        <div
          className="flex flex-wrap justify-center items-start gap-x-[4rem] gap-y-[2rem] pb-[2rem] px-[2rem]"
        >
          {newProducts.map((product: any, index: number) => (
            <ProductCard key={product._id || index} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewArrivals
