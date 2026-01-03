import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Search, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import banner4 from '../assets/banner4.png';

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      image: banner1,
      title: "Discover Hidden Culinary Gems",
      subtitle: "From street food stalls to local restaurants",
      cta: "Explore Now",
      ctaLink: "/all-reviews"
    },
    {
      image: banner2,
      title: "Share Your Food Adventures",
      subtitle: "Help others find their next favorite dish",
      cta: "Add Review",
      ctaLink: "/add-review"
    },
    {
      image: banner3,
      title: "Authentic Local Flavors",
      subtitle: "Community-driven honest reviews you can trust",
      cta: "View Favorites",
      ctaLink: "/all-favorite"
    },
    {
      image: banner4,
      title: "Rate & Review Local Eats",
      subtitle: "Your opinion matters to food enthusiasts",
      cta: "Start Reviewing",
      ctaLink: "/add-review"
    }
  ];

  const totalSlides = slides.length;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, isPaused, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false); // Pause auto-play when user manually navigates
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight * 0.65,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full h-[65vh] min-h-[500px] max-h-[700px] overflow-hidden bg-gray-900">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              />
              {/* Dark Gradient Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl animate-fade-in">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/90 backdrop-blur-sm rounded-full mb-4 animate-slide-up">
                    <Star className="w-4 h-4 text-white fill-white" />
                    <span className="text-white font-semibold text-sm">Community Rated</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-slide-up animation-delay-100">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-lg sm:text-xl text-gray-200 mb-8 animate-slide-up animation-delay-200">
                    {slide.subtitle}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4 animate-slide-up animation-delay-300">
                    <Link to={slide.ctaLink}>
                      <button className="px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2">
                        {slide.cta}
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </Link>
                    <Link to="/all-reviews">
                      <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Browse Reviews
                      </button>
                    </Link>
                  </div>

                  {/* Stats (Optional Enhancement) */}
                  <div className="flex flex-wrap gap-6 mt-8 animate-slide-up animation-delay-400">
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold">1000+ Locations</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Star className="w-5 h-5 text-amber-400" />
                      <span className="font-semibold">5000+ Reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 rounded-full transition-all duration-300 hover:scale-110 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 rounded-full transition-all duration-300 hover:scale-110 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-orange-500'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Control */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-8 right-8 z-30 px-4 py-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 rounded-full text-white text-sm font-semibold transition-all duration-300"
      >
        {isAutoPlaying ? 'Pause' : 'Play'}
      </button>

      {/* Scroll Down Indicator - Clear Visual Hint */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 pb-4">
        <button
          onClick={scrollToNextSection}
          className="flex flex-col items-center gap-2 text-white hover:text-orange-500 transition-colors duration-300 group animate-bounce-slow"
          aria-label="Scroll to next section"
        >
          <span className="text-sm font-semibold opacity-80 group-hover:opacity-100">
            Explore More
          </span>
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-orange-500/20 transition-all duration-300">
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </button>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
          animation-fill-mode: both;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Banner;