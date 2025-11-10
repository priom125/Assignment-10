import React from 'react'
import biriyani from '../assets/biriyani.png'
import chicken from '../assets/chicken.png'
function BestFood() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-10'>
        {/* card 1 */}
        <div className='flex justify-between  bg-[#C8F5E1] w-1/2 rounded-2xl mt-20'>
            <div className='py-20 px-10 w-2/3'>
                <h1 className='text-[#ff7c08] text-2xl font-bold'>Weekly best food</h1>
            <h1 className='text-[#231f40] text-5xl font-bold'>Fried Chicken</h1>
            <p className='w-2/3 text-[#484747] font-extralight pt-5 '>It features pieces of chicken often bone-in, dark, or white meat</p>

            </div>
            <div className="w-30 h-30 rounded-full bg-[#FFDAB9] flex items-center my-20 mx-10 justify-center">
                <img className='w-30 h-30 rounded-full -ml-' src={biriyani} alt="" />
            </div>
        </div>
        {/* card 2 */}
        <div className='flex justify-between bg-[#FFE5DD] w-1/2 rounded-2xl mt-20'>
            <div className='py-20 px-10 w-2/3'>
                <h1 className='text-[#ff7c08] text-2xl font-bold'>Daily best food</h1>
            <h1 className='text-[#231f40] text-3xl font-bold'>Hyderabadi Biryani</h1>
             <p className='w-2/3 text-[#484747] font-extralight pt-5 '>Hyderabadi Biryani is a celebrated rice dish with origins in the kitchens.</p>
            </div>
            <div className="w-30 h-30 rounded-full bg-[#FFDAB9] my-20 mx-10 flex items-center justify-center">
                <img className='w-30 h-30 rounded-full -ml-12' src={chicken} alt="" />
            </div>
        </div>
    </div>
  )
}

export default BestFood