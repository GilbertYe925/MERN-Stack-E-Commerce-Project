import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'
import {useRef, useEffect} from 'react'

const Ratings = ({value, text, color}: {value: number, text: string, color: string}) => {
    const fullStars = Math.floor(value)
    const halfStars = value - fullStars > 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStars
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current && color) {
            containerRef.current.style.setProperty('--rating-color', color)
        }
    }, [color])

  return (
    <div ref={containerRef} className='flex items-center'>
        {Array.from({length: fullStars}).map((_, index) => (
            <FaStar key={index} className='ml-1 rating-star' />
        ))}
        {halfStars === 1 && <FaStarHalfAlt className='ml-1 rating-star' />}
        {Array.from({length: emptyStars}).map((_, index) => (
            <FaRegStar key={index} className='ml-1 rating-star' />
        ))}

    <span className='rating-text ml-[2rem]'>{text && text}</span>
    </div>
  )
}

export default Ratings