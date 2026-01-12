import {Link, useSearchParams} from 'react-router-dom'
import { useGetProductsQuery } from '../redux/api/productApiSlice'
import Loader from '../components/common/Loader'
import Header from '../components/layout/Header'
import Message from '../components/common/Message'
import Product from './Products/Product'

const Home = () => {
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword') || undefined
    const {data: data, isLoading, error} = useGetProductsQuery({keyword, pageNumber: 1})

    return (
        <>
            {!keyword && <Header />}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {('data' in error && (error.data as any)?.message) || 'An error occurred'}
                </Message>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="ml-[20rem] mt-[10rem]">Special Products</h1>
                        <Link 
                            to="/shop" 
                            className="bg-pink-600 font-bold px-10 py-2 mr-[18rem] mt-[10rem] rounded-full"
                        >
                            Shop Now
                        </Link>
                    </div>
                    <div>
                        <div className="flex justify-center flex-wrap mt-[2rem]">
                            {data.products.map((product: any) => (
                                <div key={product._id}>
                                    <Product product={product}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Home