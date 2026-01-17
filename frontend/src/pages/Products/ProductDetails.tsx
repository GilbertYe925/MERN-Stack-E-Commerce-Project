import { useState, FormEvent, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { RootState } from '../../redux/store'
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useGetTopProductsQuery
} from '../../redux/api/productApiSlice'
import { addToCart } from '../../redux/features/cart/cartSlice'
import Loader from '../../components/common/Loader'
import Message from '../../components/common/Message'
import HeartIcon from '../../components/products/HeartIcon'
import Footer from '../../components/home/Footer'
import { MdOutlineStarOutline } from 'react-icons/md'
import { FaStar, FaRegStar } from 'react-icons/fa'
import buttonsImage from '../../public/buttons.png'

const ProductDetails = () => {
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewPage, setReviewPage] = useState(1)
  
  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery({ productId: productId! })
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation()
  const { data: topProducts } = useGetTopProductsQuery(undefined)

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateScale = () => {
      if (!wrapperRef.current) return

      const viewportWidth = window.innerWidth
      let scaleFactor = 1

      if (viewportWidth >= 1920) {
        scaleFactor = 1
      } else if (viewportWidth >= 1280) {
        scaleFactor = viewportWidth / 1920
      } else {
        scaleFactor = 1280 / 1920
      }

      wrapperRef.current.style.transform = `scale(${scaleFactor})`
      wrapperRef.current.style.transformOrigin = 'top left'
    }

    updateScale()
    window.addEventListener('resize', updateScale)

    return () => {
      window.removeEventListener('resize', updateScale)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productId])

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await createReview({
        data: {
          productId,
          rating,
          comment
        }
      }).unwrap()
      refetch()
      toast.success("Review created successfully")
      setRating(0)
      setComment('')
    } catch (error: any) {
      toast.error(error?.data?.message || error?.error || 'Failed to create review')
    }
  }

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity: quantity }))
    toast.success("Item added successfully", {
      position: "top-right",
      autoClose: 2000,
    })
  }

  const buyNowHandler = () => {
    dispatch(addToCart({ ...product, quantity: quantity }))
    navigate('/cart')
  }

  const incrementQuantity = () => {
    if (product && quantity < product.countInStock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const reviewsPerPage = 3

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-[3rem]">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center py-[3rem] px-[2rem]">
        <Message variant="danger">
          {('data' in error && (error.data as any)?.message) || 'An error occurred'}
        </Message>
      </div>
    )
  }

  if (!product) return null

  const currentPageReviews = product.reviews 
    ? product.reviews.slice((reviewPage - 1) * reviewsPerPage, reviewPage * reviewsPerPage)
    : []
  const totalPages = product.reviews ? Math.ceil(product.reviews.length / reviewsPerPage) : 0

  return (
    <div
      ref={wrapperRef}
      className="scale-wrapper w-full bg-[#CCCCCC] overflow-x-hidden"
      style={{
        width: '1920px',
        position: 'relative'
      }}
    >
      {/* Main Product Section */}
      <div className="w-full py-[6rem]">
        <div className="max-w-[76.5rem] w-full mx-auto px-[2.5rem]">
          <div className="w-full flex flex-row items-start min-h-[54rem]">
            {/* Product Image - Left Side */}
            <div className="relative w-[27rem] flex-shrink-0 flex flex-col mr-[3.5rem] min-h-[54rem]">
              <div className="w-full h-[27rem] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-[1rem] right-[1rem]">
                <HeartIcon product={product} />
              </div>

              {/* Customer Reviews Section */}
              <div className="mt-[1.75rem] flex flex-col">
                <h2 className="text-[1.75rem] font-normal font-display-sc text-black mb-[1.25rem]">
                  Customer Reviews
                </h2>

                {/* Star Ratings */}
                <div className="flex mb-[1.25rem]">
                  {[0, 1, 2, 3, 4].map((index) => (
                    index < (product.rating || 0) ? (
                      <FaStar
                        key={index}
                        className="w-[2.5rem] h-[2.5rem] text-black mr-[0.5rem] last:mr-0"
                      />
                    ) : (
                      <MdOutlineStarOutline
                        key={index}
                        className="w-[2.5rem] h-[2.5rem] text-[#333333] mr-[0.5rem] last:mr-0"
                      />
                    )
                  ))}
                </div>

                {/* Reviews List */}
                <div className="mt-[1rem] min-h-[25rem] flex flex-col">
                  {product.reviews && product.reviews.length > 0 ? (
                    <>
                      <div className="flex flex-col flex-1">
                        {currentPageReviews.map((review: any) => (
                          <div
                            key={review._id}
                            className="bg-white p-[1rem] rounded-lg border border-black mb-[1rem] last:mb-0"
                          >
                            <div className="flex justify-between items-center mb-[0.5rem]">
                              <strong className="text-black text-[0.875rem]">
                                {review.name}
                              </strong>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  i < review.rating ? (
                                    <FaStar
                                      key={i}
                                      className="w-[1rem] h-[1rem] text-black mr-[0.25rem] last:mr-0"
                                    />
                                  ) : (
                                    <FaRegStar
                                      key={i}
                                      className="w-[1rem] h-[1rem] text-[#333333] mr-[0.25rem] last:mr-0"
                                    />
                                  )
                                ))}
                              </div>
                            </div>
                            <p className="text-[0.75rem] text-[#7D7D7D] playfair-display">
                              {review.comment}
                            </p>
                            <p className="text-[0.625rem] text-[#7D7D7D] mt-[0.5rem]">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className={totalPages > 1 ? "mt-[1rem]" : "mt-[1rem] min-h-[3.5rem]"}>
                        {totalPages > 1 && (
                          <div className="flex items-center justify-center gap-[1rem]">
                          <button
                            onClick={() => setReviewPage(prev => Math.max(1, prev - 1))}
                            disabled={reviewPage === 1}
                            className="w-[6rem] h-[2rem] bg-black rounded-[1rem] flex items-center 
                              justify-center hover:bg-white hover:border hover:border-black 
                              transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                          >
                            <span className="text-[0.875rem] font-normal font-display-sc 
                              text-[#CCCCCC] group-hover:text-black transition-colors">
                              Previous
                            </span>
                          </button>
                          <span className="text-[0.875rem] font-normal font-display-sc text-black">
                            Page {reviewPage} of {totalPages}
                          </span>
                          <button
                            onClick={() => setReviewPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={reviewPage === totalPages}
                            className="w-[6rem] h-[2rem] bg-black rounded-[1rem] flex items-center 
                              justify-center hover:bg-white hover:border hover:border-black 
                              transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                          >
                            <span className="text-[0.875rem] font-normal font-display-sc 
                              text-[#CCCCCC] group-hover:text-black transition-colors">
                              Next
                            </span>
                          </button>
                        </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-[0.875rem] text-[#7D7D7D] playfair-display">
                      No reviews yet. Be the first to review!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details - Right Side */}
            <div className="flex-1 min-w-0 flex flex-col">
              <h1 className="text-[3.5rem] font-bold font-display-sc text-black mb-[1.25rem]">
                {product.name}
              </h1>

              <p className="text-[2rem] font-medium playfair-display text-[#333333] mb-[1.25rem]">
                {product.brand}
              </p>

              <p className="text-[2rem] font-bold font-display-sc text-black mb-[1.25rem]">
                ${product.price?.toFixed(2)}
              </p>

              {/* Quantity Selector */}
              <div className="flex flex-col mb-[1.25rem]">
                <label className="text-[0.875rem] font-normal playfair-display text-black mb-[0.75rem]">
                  Quantity
                </label>
                <div className="w-[6.5rem] h-[2rem] bg-white border border-black flex 
                  items-center justify-between px-[0.75rem]">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="text-[0.875rem] font-normal text-[#7D7D7D] disabled:opacity-50 
                      hover:text-black transition-colors"
                  >
                    -
                  </button>
                  <span className="text-[0.875rem] font-normal text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={product.countInStock ? quantity >= product.countInStock : false}
                    className="text-[0.875rem] font-normal text-black disabled:opacity-50 
                      hover:text-[#7D7D7D] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add To Cart Button */}
              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="w-full max-w-[21rem] h-[2.5rem] bg-white rounded-[1.5rem] flex 
                  items-center justify-center hover:bg-black transition-all disabled:opacity-50 
                  disabled:cursor-not-allowed border border-black group mb-[0.5rem]"
              >
                <span className="text-[1.25rem] font-normal font-display-sc text-black 
                  group-hover:text-white transition-colors">
                  Add To Cart
                </span>
              </button>

              {/* Buy It Now Button */}
              <button
                onClick={buyNowHandler}
                disabled={product.countInStock === 0}
                className="w-full max-w-[21rem] h-[2.5rem] bg-black rounded-[1.5rem] flex 
                  items-center justify-center hover:bg-white hover:border hover:border-black 
                  transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="text-[1.25rem] font-normal font-display-sc text-[#CCCCCC] 
                  group-hover:text-black transition-colors">
                  Buy It Now
                </span>
              </button>

              {/* Product Description */}
              <div className="mt-[2.5rem]">
                <p className="text-[1.25rem] font-normal playfair-display text-[#7D7D7D]">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="w-full bg-[#CCCCCC] py-[4rem]">
        <div className="max-w-[76.5rem] w-full mx-auto px-[2.5rem]">
          <h2 className="text-[2.5rem] font-normal font-display-sc text-black mb-[2.5rem]">
            You May Also Like
          </h2>
        </div>

        <div className="w-full flex justify-center">
          <div className="flex flex-wrap items-start justify-center">
            {topProducts?.slice(0, 3).map((relatedProduct: any) => (
              <div
                key={relatedProduct._id}
                className="flex flex-col w-[19rem] mr-[3.5rem] mb-[3.5rem] last:mr-0"
              >
                <Link 
                  to={`/product/${relatedProduct._id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="w-full aspect-square overflow-hidden cursor-pointer">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                <div className="w-full mt-[2rem] flex flex-col">
                  <Link 
                    to={`/product/${relatedProduct._id}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <h3 className="text-[1.75rem] font-normal font-display-sc text-black mb-[0.75rem] hover:underline cursor-pointer">
                      {relatedProduct.name}
                    </h3>
                  </Link>
                  <p className="text-[1.25rem] font-normal playfair-display text-[#333333] mb-[0.75rem]">
                    {relatedProduct.brand}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-[1.25rem] font-normal font-display-sc text-black">
                      ${relatedProduct.price?.toFixed(2)}
                    </p>
                    <button
                      onClick={() => {
                        dispatch(addToCart({ ...relatedProduct, quantity: 1 }))
                        toast.success("Item added successfully", {
                          position: "top-right",
                          autoClose: 2000,
                        })
                      }}
                      className="w-[2.5rem] h-[2.5rem] rounded-full bg-black overflow-hidden 
                        hover:bg-white hover:border hover:border-black transition-all group"
                    >
                      <img
                        src={buttonsImage}
                        alt="Add to cart"
                        className="w-full h-full object-cover invert-0 group-hover:invert 
                          transition-all"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Form */}
      {userInfo && (
        <div id="write-review-section" className="w-full bg-[#CCCCCC] py-[2.5rem]">
          <div className="max-w-[76.5rem] w-full mx-auto px-[2.5rem]">
            <h2 className="text-[1.75rem] font-normal font-display-sc text-black mb-[1.75rem]">
              Write Your Review
            </h2>
            <form onSubmit={submitHandler} className="flex flex-col max-w-[32rem]">
              <div className="mb-[1.25rem]">
                <label className="block text-[1rem] font-medium mb-[0.75rem] text-black">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                  className="w-full p-[0.75rem] border border-black rounded-lg bg-white text-black 
                    text-[0.875rem]"
                >
                  <option value="">Select Rating</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="mb-[1.25rem]">
                <label className="block text-[1rem] font-medium mb-[0.75rem] text-black">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={6}
                  className="w-full p-[0.75rem] border border-black rounded-lg bg-white text-black 
                    text-[0.875rem] resize-none"
                  placeholder="Write your review here..."
                />
              </div>
              <button
                type="submit"
                disabled={loadingProductReview}
                className="w-[14rem] h-[2.5rem] bg-black rounded-[1.5rem] flex items-center 
                  justify-center hover:bg-white hover:border hover:border-black transition-all 
                  disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="text-[0.875rem] font-normal font-display-sc text-[#CCCCCC] 
                  group-hover:text-black transition-colors">
                  {loadingProductReview ? 'Submitting...' : 'Submit Review'}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ProductDetails
