import { useState } from 'react'
import {Link} from 'react-router-dom'
import Ratings from './Ratings'
import {useGetTopProductsQuery} from '../../redux/api/productApiSlice'
import SmallProduct from '../../components/products/SmallProduct'
import Loader from '../../components/common/Loader'

const ProductTabs = ({product, loadingProductReview, userInfo, submitHandler, rating, setRating, comment, setComment}: 
    {product: any, loadingProductReview: boolean, userInfo: any, 
        submitHandler: (e: React.FormEvent<HTMLFormElement>) => void, 
        rating: number, setRating: (rating: number) => void, 
        comment: string, setComment: (comment: string) => void}) => {

            const {data: topProducts, isLoading: isLoadingTopProducts} = useGetTopProductsQuery(undefined)
            const [activeTab, setActiveTab] = useState(1)

            const handleClickTab = (tab: number) => {
                setActiveTab(tab)
            }
  return (
    <div className="flex flex-col md:flex-row">
        <section className="mr-[5rem]">
            <div 
            className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 1 ? 'font-bold' : ''}`} 
            onClick={() => handleClickTab(1)}>
                Write Your Review
            </div>
            <div 
            className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 2 ? 'font-bold' : ''}`} 
            onClick={() => handleClickTab(2)}>
                All Reviews ({product?.reviews?.length || 0})
            </div>
            <div 
            className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 3 ? 'font-bold' : ''}`} 
            onClick={() => handleClickTab(3)}>
                Related Products
            </div>
        </section>
        
        <section>
            {activeTab === 1 && (
                <div className="mt-4">
                    {userInfo ? (
                        <form onSubmit={submitHandler}>
                            <div className='my-2'>
                                <label htmlFor="rating" className='block mb-2 text-xl'>Rating</label>
                                <select 
                                id="rating" 
                                required 
                                value={rating} 
                                onChange={(e) => setRating(Number(e.target.value))}
                                className='p-2 border rounded-lg xl:w-[40rem] text-black'>
                                    <option value="">Select</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                </select>
                            </div>

                            <div className="my-2">
                                <label htmlFor="comment" className='block mb-2 text-xl'>Comment</label>
                            </div>
                            <textarea 
                            id="comment" 
                            required 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)} 
                            className='p-2 border rounded-lg xl:w-[40rem] text-black'
                            />
                            <button
                            type="submit"
                            className="mt-4 bg-pink-600 text-white py-2 px-4 rounded-lg"
                            >
                                Submit
                            </button>
                        </form>
                    ):(
                        <p>Please <Link to="/auth">sign in</Link> to write a review</p>
                    )}
                </div>
            )}
            <section>
            {activeTab === 2 && (
                <div className="mt-4">
                    {product?.reviews && product.reviews.length > 0 ? (
                        <div>
                            {product.reviews.map((review: any, index: number) => (
                                <div
                                    key={review._id}
                                    className="bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                                >
                                    <div className="flex justify-between">
                                    <strong className="text-[#B0B0B0]">{review.name}</strong>
                                    <p className="text-[#B0B0B0]">
                                        {review.createdAt.substring(0, 10)}
                                    </p>
                                    </div>
                
                                    <p className="my-4 text-[#B0B0B0]">{review.comment}</p>
                                    <Ratings value={review.rating} text="" color="#B0B0B0" />
                              </div>
                            ))}
                        </div>
                    ) : (
                        <p>No reviews yet</p>
                    )}
                </div>
            )}
            </section>
            <section>
                {activeTab === 3 && (
                    <div className="ml-[4rem] flex flex-wrap">
                        {isLoadingTopProducts ? (
                            <Loader />
                        ) : (
                            topProducts?.map((product: any) => (
                                <SmallProduct key={product._id} product={product} />
                            ))
                        )}
                    </div>
                )}
            </section>

            
        </section>
    </div>
  )
}

export default ProductTabs