import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import moment from "moment"
import {
    FaStar,
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStore,
} from "react-icons/fa"
import { useBlocker } from "react-router-dom"

const ProductCarousel = () => {

    const {data: products, isLoading, error} = useGetTopProductsQuery(undefined)
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000

    }
    return (
        <div className="mb-4 xl:block lg:block md:block">
            <style>{`
                .slick-prev:before,
                .slick-next:before {
                    color: black !important;
                }
            `}</style>
            {isLoading ? null : error? (
            <Message variant='danger'>
                {('data' in error && (error.data as any)?.message) || 'An error occurred'}
            </Message>
            ) : <Slider {...settings} className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:block"> 
                {products?.map((product: any) => {
                    const {image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock} = product
                    return (
                        <div key={_id}>
                            <img src={image} alt={name} className="w-full rounded-lg object-cover h-[30rem]"/>
                            <div className="flex justify-between w-[20rem]">
                                <div className="one">
                                    <h2>{name}</h2>
                                    <p>${price}</p> <br /> <br />
                                    <p className="w-[25rem]">({description.substring(0, 170)}...)</p>
                                </div>
                                <div className="two flex justify-between w-[20rem]">
                                    <div className="one">
                                        <h1>
                                            <FaStore className="mr-2 text-white"/>  Brand: {brand}
                                        </h1>
                                        <h1>
                                            <FaClock className="mr-2 text-white"/>  Added: {moment(createdAt).fromNow()}
                                        </h1>                                        
                                        <h1>
                                            <FaStar className="mr-2 text-white"/>  Reviews: {numReviews}
                                        </h1>
                                    </div>
                                    <div className="two">
                                        <div className="flex items-center mb-6">
                                            <FaStar className="mr-2 text-white"/>  Ratings:{Math.round(rating)}
                                        </div>
                                        <div className="flex items-center mb-6">
                                            <FaShoppingCart className="mr-2 text-white"/>  Quantity:{(quantity)}
                                        </div>
                                        <div className="flex items-center mb-6">
                                            <FaBox className="mr-2 text-white"/>  In Stock:{(countInStock)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider>}
        </div>
    )
}

export default ProductCarousel