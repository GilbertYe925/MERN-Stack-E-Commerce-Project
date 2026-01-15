import { useEffect, useRef } from 'react'
import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'
import CollectionShowcase from '../components/home/CollectionShowcase'
import FeaturedProducts from '../components/home/FeaturedProducts'
import NewArrivals from '../components/home/NewArrivals'
import Footer from '../components/home/Footer'

const Home = () => {
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
        scaleFactor = 1280 / 1920 // 0.6667
      }

      // Section height should always be 1080px (base design height)
      // This ensures all elements maintain their relative vertical positions
      // The scaleFactor will handle scaling the entire container proportionally
      // After scaling: section appears as 1080px * scaleFactor tall
      const sectionHeight = 1080

      // Set CSS custom property for section height
      wrapperRef.current.style.setProperty('--section-height', `${sectionHeight}px`)
      
      // Apply scale transform
      wrapperRef.current.style.transform = `scale(${scaleFactor})`
      wrapperRef.current.style.transformOrigin = 'top left'
      
      // Update all section heights and parent container
      const updateSections = () => {
        const sections = wrapperRef.current?.querySelectorAll('section') || []
        
        sections.forEach((section) => {
          const sectionElement = section as HTMLElement
          // CSS already sets height via --section-height, but we set it directly to ensure it's applied
          sectionElement.style.setProperty('height', `${sectionHeight}px`, 'important')
          sectionElement.style.setProperty('min-height', `${sectionHeight}px`, 'important')
          sectionElement.style.setProperty('max-height', `${sectionHeight}px`, 'important')
        })
        
        // Set parent container height to match scaled wrapper height
        // This prevents the body from extending beyond the scaled content
        requestAnimationFrame(() => {
          const wrapperHeight = wrapperRef.current?.offsetHeight || wrapperRef.current?.scrollHeight || 0
          const scaledHeight = wrapperHeight * scaleFactor
          
          const parentContainer = wrapperRef.current?.parentElement
          if (parentContainer && scaledHeight > 0) {
            parentContainer.style.height = `${scaledHeight}px`
            parentContainer.style.overflow = 'hidden'
          }
        })
      }
      
      // Update sections after a brief delay to ensure all elements are rendered
      requestAnimationFrame(() => {
        updateSections()
      })
    }

    // Initial update
    updateScale()
    
    window.addEventListener('resize', updateScale)
    
    return () => {
      window.removeEventListener('resize', updateScale)
    }
  }, [])

  return (
    <div 
      ref={wrapperRef}
      className="scale-wrapper w-full bg-[#CCCCCC] overflow-x-hidden"
      style={{
        width: '1920px',
        position: 'relative'
      }}
    >
      <HeroSection />
      <CategorySection />
      <CollectionShowcase />
      <FeaturedProducts />
      <NewArrivals />
      <Footer />
    </div>
  )
}

export default Home
