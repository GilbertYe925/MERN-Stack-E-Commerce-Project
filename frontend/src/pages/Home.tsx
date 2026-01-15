import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'
import CollectionShowcase from '../components/home/CollectionShowcase'
import FeaturedProducts from '../components/home/FeaturedProducts'
import NewArrivals from '../components/home/NewArrivals'
import Footer from '../components/home/Footer'

const Home = () => {
    return (
        <div className="w-full bg-[#CCCCCC]">
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