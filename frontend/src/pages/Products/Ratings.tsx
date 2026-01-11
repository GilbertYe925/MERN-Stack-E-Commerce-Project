import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'

const Ratings = ({value, text, color}: {value: number, text: string, color: string}) => {
    const fullStars = Math.floor(value)
    const halfStars = value - fullStars > 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStars

  return (
    <div className='flex items-center'>
        {Array.from({length: fullStars}).map((_, index) => (
            <FaStar key={index} style={{color: color}} className='ml-1' />
        ))}
        {halfStars === 1 && <FaStarHalfAlt style={{color: color}} className='ml-1' />}
        {Array.from({length: emptyStars}).map((_, index) => (
            <FaRegStar key={index} style={{color: color}} className='ml-1' />
        ))}

    <span className='rating-text ml-[2rem]' style={{color: color}}>{text && text}</span>
    </div>
  )
}

export default Ratings