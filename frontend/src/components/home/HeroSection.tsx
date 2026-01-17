import { Link } from 'react-router-dom'
import HomeNavigation from '../layout/HomeNavigation'
import { FaRing, FaGem } from 'react-icons/fa'
import handImage from '../../public/hand.png'
import circleImage from '../../public/circle1.png'
import starImage from '../../public/star.png'

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-screen bg-component overflow-hidden"
    >
      <HomeNavigation />

      {/* Blurred circular background element */}
      <div
        className="absolute left-1/2 top-[17.5rem] transform -translate-x-1/2 w-[28rem] 
          h-[28rem] bg-[#C9C1BB] rounded-full blur-[6.5rem]"
      />

      {/* Centered "Auren Luxury" text */}
      <div
        className="absolute left-1/2 top-[7rem] transform -translate-x-1/2 z-20"
      >
        <h1
          className="text-[8rem] leading-[11rem] text-white font-normal 
            whitespace-nowrap text-shadow-white"
        >
          Auren Luxury
        </h1>
      </div>

      {/* Main content container */}
      <div
        className="relative z-10 flex items-center justify-between px-[2rem] pt-[1.5rem]"
      >
        {/* Left side - Text content */}
        <div
          className="flex flex-col gap-[1.5rem] max-w-[36rem] mt-[26rem]"
        >
          <h2
            className="text-[2.5rem] leading-[4rem] text-white"
          >
            Auren Luxury - Jewelry shaped by fortune
          </h2>

          <p
            className="text-[1.25rem] leading-[2rem] text-black font-normal playfair-display 
              max-w-[34rem] mb-[1rem]"
          >
            Crafted with care, our jewelry is designed to carry intention and quiet fortune. 
            Each piece serves as a symbol of hope, timing, and the belief that good things 
            find their way.
          </p>

          <Link
            to="/shop"
            className="w-[11rem] h-[5rem] bg-white rounded-[2rem] flex items-center justify-center 
              text-[1.5rem] text-text-primary font-normal hover:bg-text-primary 
              hover:text-white transition-all shadow-button text-center"
          >
            Shop Now
          </Link>
        </div>

        {/* Center - Product Image */}
        <div
          className="absolute left-1/2 top-[2rem] transform -translate-x-1/2 w-[25rem] 
            h-[66rem] z-0"
        >
          <img
            src={handImage}
            alt="Luxury Jewelry"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Custom Jewelry Section */}
        <div
          className="absolute right-[5.5rem] top-[48rem] flex flex-col gap-[1.5rem] z-10"
        >
          <div className="flex items-center">
            <div
              className="relative w-[7.5rem] h-[7.5rem] z-10"
            >
              <div className="absolute inset-0 bg-white rounded-full" />
              <FaRing
                className="absolute left-[2rem] top-[3rem] w-[2rem] h-[2rem] text-black"
              />
            </div>

            <div
              className="relative w-[7.5rem] h-[7.5rem] -ml-[2rem] z-0"
            >
              <div className="absolute inset-0 bg-white rounded-full" />
              <div
                className="absolute inset-[0.5rem] rounded-full overflow-hidden"
              >
                <img
                  src={circleImage}
                  alt="Circle"
                  className="w-full h-full object-cover"
                />
              </div>
              <FaGem
                className="absolute left-[2rem] top-[3rem] w-[2rem] h-[2rem] text-black"
              />
            </div>
          </div>

          <h3
            className="text-[1.5rem] leading-[2rem] text-white font-normal"
          >
            Design Your Story
          </h3>

          <div
            className="flex flex-col gap-[0.5rem] ml-[3.5rem]"
          >
            <p
              className="text-[1rem] leading-[1.5rem] text-black font-normal playfair-display"
            >
              Create Your own
            </p>
            <p
              className="text-[1rem] leading-[1.5rem] text-black font-normal playfair-display"
            >
              Custom Jewelry
            </p>
          </div>
        </div>

        <div
          className="absolute right-[3rem] top-[14rem] w-[14rem] h-[14rem]"
        >
          <img
            src={starImage}
            alt="Star"
            className="w-full h-full object-contain"
          />
        </div>

        <div
          className="absolute right-[10rem] top-[22rem] w-[7rem] h-[7rem]"
        >
          <img
            src={starImage}
            alt="Star"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
