import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa'
import { HiOutlineChat } from 'react-icons/hi'
import footerImage from '../../public/footer.png'

const Footer = () => {

  return (
    <footer
      className="relative w-full bg-cover bg-center overflow-x-hidden mb-0"
      style={{
        backgroundImage: `url(${footerImage})`,
      }}
    >
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full px-[2rem]"
      >
        {/* Logo - Top Center */}
        <div
          className="absolute top-[2rem] left-1/2 transform -translate-x-1/2"
        >
          <div
            className="w-[8.5rem] h-[7rem] bg-black rounded-[0.5rem] flex items-center justify-center"
          >
            <span
              className="text-white text-xs font-bold"
            >
              Logo
            </span>
          </div>
        </div>

        {/* Social Media Icons - Top Right */}
        <div
          className="absolute top-[2rem] right-[2rem] flex items-center gap-[1rem]"
        >
          <a
            href="#"
            className="w-[2.5rem] h-[2.5rem] rounded-full 
              bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center 
              justify-center hover:opacity-80 transition-opacity"
            aria-label="Instagram"
          >
            <FaInstagram
              className="w-[1.5rem] h-[1.5rem] text-white"
            />
          </a>

          <a
            href="#"
            className="w-[2.5rem] h-[2.5rem] rounded-full bg-[#1877F2] flex items-center 
              justify-center hover:opacity-80 transition-opacity"
            aria-label="Facebook"
          >
            <FaFacebook
              className="w-[1.5rem] h-[1.5rem] text-white"
            />
          </a>

          <a
            href="#"
            className="w-[2.5rem] h-[3rem] rounded-full bg-black 
              flex items-center justify-center hover:opacity-80 transition-opacity relative 
              overflow-hidden"
            aria-label="TikTok"
          >
            <FaTiktok
              className="w-[1.5rem] h-[1.5rem] text-white"
            />
          </a>

          <a
            href="#"
            className="w-[2.5rem] h-[2.5rem] rounded-full bg-black flex items-center 
              justify-center hover:opacity-80 transition-opacity"
            aria-label="Snapchat"
          >
            <HiOutlineChat
              className="w-[1.5rem] h-[1.5rem] text-white"
            />
          </a>
        </div>

        {/* Heading */}
        <h2
          className="text-[3rem] leading-[4rem] text-black font-normal text-center mb-[2rem] 
            text-shadow-default"
        >
          Quality Over Quantity !
        </h2>

        {/* Email Subscription */}
        <div
          className="flex flex-col items-center gap-[0.5rem] mb-[2rem] w-full max-w-[39.5rem]"
        >
          <p
            className="text-[1.5rem] leading-[2rem] text-black font-medium playfair-display text-center"
          >
            Subscribe To our E mail
          </p>
          <div className="flex items-center w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-[39.5rem] h-[4rem] bg-white rounded-[1.5rem] 
                px-[1.5rem] text-[1rem] shadow-input focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Shop All Button */}
        <Link
          to="/shop"
          className="w-[11.5rem] h-[4rem] bg-white rounded-[1.5rem] flex items-center justify-center 
            text-[2rem] leading-[2.5rem] text-text-primary font-normal hover:bg-text-primary 
            hover:text-white transition-all shadow-button"
        >
          Shop All
        </Link>

        {/* Copyright */}
        <p
          className="absolute bottom-0 pb-[2rem] text-[1.5rem] leading-[2rem] text-black 
            font-medium playfair-display text-center w-full"
        >
          © 2025, Placeholder Powered by Placeholder. Privacy Policy. Refund Policy
        </p>
      </div>
    </footer>
  )
}

export default Footer
