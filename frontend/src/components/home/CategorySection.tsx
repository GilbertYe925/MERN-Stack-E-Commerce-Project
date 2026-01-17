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
    <section
      className="w-full h-screen bg-primary flex items-start pt-[7rem] overflow-x-hidden"
    >
      <div className="max-w-[90rem] mx-auto w-full">
        <h2
          className="text-[3.75rem] text-black font-normal text-center 
            mb-[12rem] text-shadow-default"
        >
          Shop By Category
        </h2>

        <div
          className="flex justify-center items-start gap-[7rem]"
        >
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <Link
                to="/shop"
                className="w-[21rem] h-[28rem] overflow-hidden rounded-[0.5rem] 
                  hover:opacity-90 transition-opacity relative flex-shrink-0"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="mt-[2rem] text-center">
                <h3
                  className="text-[1.75rem] leading-[2rem] text-black font-normal"
                >
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
