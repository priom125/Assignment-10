import React from 'react';
import { NavLink } from 'react-router'; 
import { MapPin, Store , Star } from 'lucide-react';


const ReviewCard = ({ review }) => {
    
   
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} size={16} fill="#FCD34D" stroke="#FCD34D" />);
        }
        
      
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
        }
        
        return stars;
    };

  
   

    return (

<div className="overflow-hidden transition-shadow duration-300 hover:shadow-xl rounded-xl">
  {/* Image Container */}
  <div
    className="
      relative 
      h-48 sm:h-56 md:h-64 lg:h-72 
      overflow-hidden 
      transform
      rounded-tl-[3rem] 
      rounded-br-[1rem] 
      rounded-tr-[0.5rem] 
      rounded-bl-[0.5rem]
      transition-all duration-500 ease-in-out 
      hover:rounded-xl
    "
  >
    <img
      className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
      src={review.foodImageUrl}
      alt={review.foodName}
      loading="lazy"
    />
  </div>

  {/* Content */}
  <div className="p-4 sm:p-5">
    {/* Reviewer Info */}
    <div className="text-sm text-gray-500 mb-2 sm:mb-3 flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-2">
      <span className="font-semibold text-gray-700">By {review.reviewerName}</span>
    </div>

    {/* Food Name */}
    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
      {review.foodName}
    </h3>

    {/* Restaurant & Location */}
    <div className="flex flex-col space-y-1 mb-3 sm:mb-4 text-gray-700 text-sm sm:text-base">
      <div className="flex items-center font-medium">
        <Store size={14} className="mr-1 text-indigo-500" />
        <span className="text-indigo-600">{review.restaurantName}</span>
      </div>
      <div className="flex items-center text-gray-500">
        <MapPin size={14} className="mr-1" />
        <span>{review.location}</span>
      </div>
    </div>

    {/* Rating + Button */}
    <div className="flex flex-col sm:flex-row justify-between items-center pt-3 border-t space-y-2 sm:space-y-0">
      {/* Star Rating */}
      <div className="flex items-center space-x-1">
        {renderStars(review.starRating)}
        <span className="text-sm font-bold text-gray-800 hidden sm:inline">{review.starRating}</span>
      </div>

      {/* View Details Button */}
      <NavLink
        to={`/review/${review._id}`}
        className="
          block w-full sm:w-auto text-center py-2 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition duration-150
        "
      >
        View Details
      </NavLink>
    </div>
  </div>
</div>

    );
};

export default ReviewCard;