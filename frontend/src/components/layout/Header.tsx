import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Loader from "../common/Loader"
import SmallProduct from "../products/SmallProduct"
import ProductCarousel from "../products/ProductCarousel"


const Header = () => {

    const {data: data, isLoading, error} = useGetTopProductsQuery(undefined)
    if(isLoading) return <Loader/>
        
    if(error) {
        return <h1 className="text-red-500">ERROR</h1>
    }

  return (
    <>
    <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
            <div className="grid grid-cols-2">
                {data?.map((product: any) => (
                    <div key={product._id}>
                        <SmallProduct product={product}/>
                    </div>
                ))}
            </div>
        </div>
        <ProductCarousel />
    </div>

    </>
  )
}

export default Header
