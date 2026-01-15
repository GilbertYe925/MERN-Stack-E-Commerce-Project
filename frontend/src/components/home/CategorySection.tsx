import { Link } from 'react-router-dom'
import cat1 from '../../public/cat1.png'
import cat2 from '../../public/Cat2.png'
import cat3 from '../../public/cat3.png'
import cat4 from '../../public/cat4.png'

const CategorySection = () => {
  const categories = [
    { name: 'Fate', image: cat1 },
    { name: 'Sign', image: cat2 },
    { name: 'Omen', image: cat3 },
    { name: 'Destiny', image: cat4 },
  ]

  return (
    <section className="w-full h-screen bg-[#CCCCCC] flex items-center">
      <div className="max-w-[90rem] mx-auto w-full">
        <h2 className="text-[4.5rem] text-black font-normal text-center mb-[10rem] text-shadow-default">
          Shop By Category
        </h2>
        
        <div className="flex justify-center items-start gap-[7rem] px-[2rem]">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <Link 
                to="/shop" 
                className="w-[24rem] h-[30rem] overflow-hidden rounded-lg hover:opacity-90 transition-opacity relative"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="mt-[2rem] text-center">
                <h3 className="text-[2rem] leading-[2rem] text-black font-normal">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
