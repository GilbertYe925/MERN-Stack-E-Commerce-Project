import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'
import CollectionShowcase from '../components/home/CollectionShowcase'
import FeaturedProducts from '../components/home/FeaturedProducts'
import NewArrivals from '../components/home/NewArrivals'
import Footer from '../components/home/Footer'
import { useScaleWrapper } from '../hooks/useScaleWrapper'

const Home = () => {
  const wrapperRef = useScaleWrapper()

  return (
    <div 
      ref={wrapperRef}
      className="scale-wrapper w-full bg-primary overflow-x-hidden"
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
