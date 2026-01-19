import { Link } from 'react-router-dom'
import { HOME_CATEGORIES } from '../../config/categories'

const CategorySection = () => {
  const categories = HOME_CATEGORIES

  return (
    <section
      data-section-id="category"
      data-height-type="reduced"
      className="w-full bg-primary flex items-start pt-[3rem] overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto w-full">
        <h2
          className="text-[2.5rem] text-black font-normal text-center 
            mb-[3rem] text-shadow-default"
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
