import React from 'react'
import biriyani from '../assets/biriyani.png'
import chicken from '../assets/chicken.png'
function BestFood() {
  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">

  <div className="bg-[#C8F5E1] rounded-2xl flex flex-col md:flex-row items-center md:items-start p-6 sm:p-10">

    <div className="md:w-2/3 mb-6 md:mb-0">
      <h2 className="text-[#ff7c08] text-xl sm:text-2xl font-bold">Weekly Best Food</h2>
      <h1 className="text-[#231f40] text-3xl sm:text-5xl font-bold mt-2">Fried Chicken</h1>
      <p className="text-[#484747] font-extralight mt-4 text-sm sm:text-base md:text-lg">
        It features pieces of chicken often bone-in, dark, or white meat.
      </p>
    </div>

    <div className="md:w-1/3 flex justify-center md:justify-end">
      <div className="bg-[#FFDAB9] rounded-full w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center overflow-hidden">
        <img
          src={biriyani}
          alt="Fried Chicken"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  </div>


  <div className="bg-[#FFE5DD] rounded-2xl flex flex-col md:flex-row items-center md:items-start p-6 sm:p-10">

    <div className="md:w-2/3 mb-6 md:mb-0">
      <h2 className="text-[#ff7c08] text-xl sm:text-2xl font-bold">Daily Best Food</h2>
      <h1 className="text-[#231f40] text-2xl sm:text-3xl font-bold mt-2">Hyderabadi Biryani</h1>
      <p className="text-[#484747] font-extralight mt-4 text-sm sm:text-base md:text-lg">
        Hyderabadi Biryani is a celebrated rice dish with origins in the kitchens.
      </p>
    </div>

    <div className="md:w-1/3 flex justify-center md:justify-end">
      <div className="bg-[#FFDAB9] rounded-full w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center overflow-hidden">
        <img
          src={chicken}
          alt="Hyderabadi Biryani"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  </div>
</div>

  )
}

export default BestFood