import React from 'react'
import banner1 from '../assets/banner1.png'
import banner2 from '../assets/banner2.png'
import banner3 from '../assets/banner3.png'
import banner4 from '../assets/banner4.png'

function Banner() {
  return (
<div className="w-full">
  <div className="carousel w-full max-w-[100vw] mx-auto rounded-xl overflow-hidden">
    
    <div id="slide1" className="carousel-item relative w-full">
      <img
        src={banner1}
        alt="Banner 1"
        className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 md:px-10">
        <a href="#slide4" className="btn btn-circle btn-sm sm:btn-md">❮</a>
        <a href="#slide2" className="btn btn-circle btn-sm sm:btn-md">❯</a>
      </div>
    </div>


    <div id="slide2" className="carousel-item relative w-full">
      <img
        src={banner2}
        alt="Banner 2"
        className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 md:px-10">
        <a href="#slide1" className="btn btn-circle btn-sm sm:btn-md">❮</a>
        <a href="#slide3" className="btn btn-circle btn-sm sm:btn-md">❯</a>
      </div>
    </div>

  
    <div id="slide3" className="carousel-item relative w-full">
      <img
        src={banner3}
        alt="Banner 3"
        className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 md:px-10">
        <a href="#slide2" className="btn btn-circle btn-sm sm:btn-md">❮</a>
        <a href="#slide4" className="btn btn-circle btn-sm sm:btn-md">❯</a>
      </div>
    </div>

 
    <div id="slide4" className="carousel-item relative w-full">
      <img
        src={banner4}
        alt="Banner 4"
        className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 md:px-10">
        <a href="#slide3" className="btn btn-circle btn-sm sm:btn-md">❮</a>
        <a href="#slide1" className="btn btn-circle btn-sm sm:btn-md">❯</a>
      </div>
    </div>
  </div>
</div>



  )
}

export default Banner