import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa'
import { HiOutlineChat } from 'react-icons/hi'
import { useRef, useEffect } from 'react'
import footerImage from '../../public/footer.png'

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.style.setProperty('--footer-bg-image', `url(${footerImage})`)
    }
  }, [])

  return (
    <footer 
      ref={footerRef}
      className="relative w-full h-screen bg-cover bg-center"
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-[2rem]">
        {/* Social Media Icons - Top Right */}
        <div className="absolute top-[2rem] right-[2rem] flex items-center gap-[1rem]">
          <a 
            href="#" 
            className="w-[2.5rem] h-[2.5rem] rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Instagram"
          >
            <FaInstagram className="w-[1.5rem] h-[1.5rem] text-white" />
          </a>
          
          <a 
            href="#" 
            className="w-[2.5rem] h-[2.5rem] rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Facebook"
          >
            <FaFacebook className="w-[1.5rem] h-[1.5rem] text-white" />
          </a>
          
          <a 
            href="#" 
            className="w-[2.5rem] h-[3rem] rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity relative overflow-hidden"
            aria-label="TikTok"
          >
            <FaTiktok className="w-[1.5rem] h-[1.5rem] text-white" />
          </a>
          
          <a 
            href="#" 
            className="w-[2.5rem] h-[2.5rem] rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Snapchat"
          >
            <HiOutlineChat className="w-[1.5rem] h-[1.5rem] text-white" />
          </a>
        </div>

        {/* Logo */}
        <div className="mb-[1rem]">
          <div className="w-[8.5rem] h-[7rem] bg-black rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">Logo</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-[3rem] leading-[4rem] text-black font-normal text-center mb-[2rem] text-shadow-default">
          Quality Over Quantity !
        </h2>

        {/* Email Subscription */}
        <div className="flex flex-col items-center gap-[0.5rem] mb-[2rem]">
          <p className="text-[1.5rem] leading-[2rem] text-black font-medium playfair-display">
            Subscribe To our E mail
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-[39.5rem] h-[4rem] bg-white rounded-[1.5rem] px-[1.5rem] text-[1rem] shadow-input focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Shop All Button */}
        <Link 
          to="/shop"
          className="w-[11.5rem] h-[4rem] bg-white rounded-[1.5rem] flex items-center justify-center text-[2rem] leading-[2.5rem] text-text-primary font-normal hover:bg-text-primary hover:text-white transition-all shadow-button mb-[2rem]"
        >
          Shop All
        </Link>

        {/* Copyright */}
        <p className="text-[1.5rem] leading-[2rem] text-black font-medium playfair-display text-center">
          © 2025, Placeholder Powered by Placeholder. Privacy Policy. Refund Policy
        </p>
      </div>
    </footer>
  )
}

export default Footer
