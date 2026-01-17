import col1 from '../../public/col1.png'
import col2 from '../../public/col2.png'

const CollectionShowcase = () => {
  return (
    <section
      className="relative w-full h-screen bg-component overflow-x-hidden overflow-y-auto"
    >
      {/* Left product image */}
      <div
        className="absolute left-[6rem] top-[6rem] w-[32rem] h-[32rem]"
      >
        <img
          src={col1}
          alt="Collection Item 1"
          className="w-full h-full object-cover rounded-[3rem] drop-shadow-collection"
        />
      </div>

      {/* Right product image */}
      <div
        className="absolute right-[3rem] top-[27rem] w-[32rem] h-[32rem]"
      >
        <img
          src={col2}
          alt="Collection Item 2"
          className="w-full h-full object-cover rounded-[3rem] drop-shadow-collection"
        />
      </div>

      {/* "Our New" text */}
      <div
        className="absolute left-[35.5rem] top-[24rem]"
      >
        <h2
          className="text-[4.75rem] text-black font-bold text-shadow-default"
        >
          Our New
        </h2>
      </div>

      {/* "Collection" text */}
      <div
        className="absolute right-[31.5rem] top-[31rem]"
      >
        <h2
          className="text-[6rem] leading-[7rem] text-white font-bold text-shadow-default"
        >
          Collection
        </h2>
      </div>

      {/* Description text */}
      <div
        className="absolute left-[25rem] bottom-[18rem] flex flex-col"
      >
        <p
          className="text-[2rem] text-[#333333] font-normal"
        >
          Discover Timeless Elegance
        </p>
        <p
          className="text-[2rem] text-[#333333] font-normal -translate-x-[2.5rem]"
        >
          with our shinning new collection
        </p>
      </div>
    </section>
  )
}

export default CollectionShowcase
