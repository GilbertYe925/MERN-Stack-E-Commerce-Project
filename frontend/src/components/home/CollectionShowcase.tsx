import col1 from '../../public/col1.png'
import col2 from '../../public/col2.png'

const CollectionShowcase = () => {
  return (
    <section className="relative w-full h-screen bg-[#7B7B7B] overflow-hidden">
      
      {/* Left product image */}
      <div className="absolute left-[9rem] top-[2rem] w-[34rem] h-[34rem]">
        <img 
          src={col1} 
          alt="Collection Item 1"
          className="w-full h-full object-cover rounded-[3rem] drop-shadow-collection"
        />
      </div>

      {/* Right product image */}
      <div className="absolute right-[6rem] top-[23rem] w-[34rem] h-[34rem]">
        <img 
          src={col2} 
          alt="Collection Item 2"
          className="w-full h-full object-cover rounded-[3rem] drop-shadow-collection"
        />
      </div>

      {/* "Our New" text */}
      <div className="absolute left-[40rem] top-[18rem]">
        <h2 className="text-[5rem] text-black font-bold text-shadow-default">
          Our New
        </h2>
      </div>

      {/* "Collection" text */}
      <div className="absolute right-[36rem] top-[27rem]">
        <h2 className="text-[6.5rem] leading-[7rem] text-white font-bold text-shadow-default">
          Collection
        </h2>
      </div>

      {/* Description text */}
      <div className="absolute left-[29rem] bottom-[22rem] flex flex-col">
        <p className="text-[2.5rem] text-[#333333] font-normal">
          Discover Timeless Elegance
        </p>
        <p className="text-[2.5rem] text-[#333333] font-normal -translate-x-[2.5rem]">
          with our shinning new collection
        </p>
      </div>
    </section>
  )
}

export default CollectionShowcase
