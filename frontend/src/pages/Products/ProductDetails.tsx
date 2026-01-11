import {useState, FormEvent} from 'react'
import {useNavigate, useParams, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {RootState} from '../../redux/store'
import {useGetProductDetailsQuery, useCreateReviewMutation} from '../../redux/api/productApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {FaBox, FaClock, FaShoppingCart, FaStar, FaStore} from 'react-icons/fa'
import moment from 'moment'
import HeartIcon from './HeartIcon'
import Ratings from './Ratings'
import ProductTabs from './ProductTabs'
import {addToCart} from '../../redux/features/cart/cartSlice'



const ProductDetails = () => {
    const {id: productId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const {data:product, isLoading, refetch, error} = useGetProductDetailsQuery({productId: productId!})
    const {userInfo} = useSelector((state: RootState) => state.auth)
    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation()
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          await createReview({
            productId,
            rating,
            comment,
          }).unwrap();
          refetch();
          toast.success("Review created successfully");
        } catch (error: any) {
          toast.error(error?.data?.message || error?.error || 'Failed to create review');
        }
      }; 

    const addToCartHandler = () => {
        dispatch(addToCart({...product, quantity: quantity}))
        navigate('/cart')
    }
    
  return (
    <>
      <div>
        <Link className="text-white font-semibold hover-underline ml-[10rem]" to="/"> 
        Go Back
        </Link>
    </div>  
    {isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">
            {('data' in error && (error.data as any)?.message) || 'An error occurred'}
        </Message>
    ) : product ? (
        <>
            <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
                <div>
                    <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]" />
                    <HeartIcon product={product} />
                </div>
                <div className="flex flex-col justify-between">
                    <h2 className="text-2xl font-semibold">
                        {product.name}
                    </h2>
                    <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-black">
                        {product.description}
                    </p>
                    <p className="text-5xl my-4 font-extrabold">${product.price}</p>
                    <div className="one">
                        <h1 className="flex items-center mb-6" >
                            <FaStore className="mr-2 text-black"/>Brand: {product.brand}
                        </h1>
                        <h1 className="flex items-center mb-6" >
                            <FaClock className="mr-2 text-black"/>Added: {moment(product.createdAt).fromNow()}
                        </h1>
                        <h1 className="flex items-center mb-6" >
                            <FaStar className="mr-2 text-black"/>Reviews: {product.numReviews}
                        </h1>
                    </div>
                    <div className="two">
                        <h1 className="flex items-center mb-6">
                            <FaStar className="mr-2 text-black"/>Ratings:{product.rating}
                        </h1>
                        <h1 className="flex items-center mb-6">
                            <FaShoppingCart className="mr-2 text-black"/>Quantity:{product.quantity}
                        </h1>
                        <h1 className="flex items-center mb-6">
                            <FaBox className="mr-2 text-black"/>In Stock:{product.countInStock}
                        </h1>
                    </div>
                    <div className="flex justify-between">
                        <Ratings value={product.rating} text={`${product.numReviews} reviews`} color={'black'} />
                    </div>

                    {product.countInStock > 0 && (
                        <div >
                            <select 
                            value={quantity} 
                            onChange={e => setQuantity(Number(e.target.value))} 
                            className='p-2 w-[6rem] rounded-lg text-black'>
                                {Array.from({length: product.countInStock}, (_, index) => (
                                    <option key={index} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <button 
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                        className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0">
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
                    <ProductTabs 
                    product={product}
                    loadingProductReview={loadingProductReview} 
                    userInfo={userInfo} 
                    submitHandler={submitHandler} 
                    rating={rating} 
                    setRating={setRating} 
                    comment={comment} 
                    setComment={setComment} />
                </div>
            </div>
        </>
    ) : null}
    </>
  )
}

export default ProductDetails