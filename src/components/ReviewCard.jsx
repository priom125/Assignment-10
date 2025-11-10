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

        <div className="bg-white shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
     
            <div 
                className="
                    h-48 overflow-hidden transform 
                    // Initial specific border-radii for the diagonal look
                    rounded-tl-[3rem] 
                    rounded-br-[1rem] 
                    rounded-tr-[0.5rem] 
                    rounded-bl-[0.5rem] 
                    
                    // Hover effect: Transitions to a more uniformly rounded shape (square)
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

            <div className="p-5">
             
                <div className="text-sm text-gray-500 mb-3 flex space-x-2">
                    <span className="font-semibold text-gray-700">By {review.reviewerName}</span>
                    <span>/</span>
                    
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {review.foodName}
                </h3>
                
          
                <div className="flex flex-col space-y-1 mb-4 text-gray-700">
                    <div className="flex items-center text-sm font-medium">
                         <Store size={14} className="mr-1 text-indigo-500" />
                        <span className="text-indigo-600">{review.restaurantName}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                        <MapPin size={14} className="mr-1" />
                        <span>{review.location}</span>
                    </div>
                </div>

       
                <div className="flex justify-between items-center pt-3 border-t">
      
                    <div className="flex items-center space-x-0.5">
                        {renderStars(review.starRating)}
                        <span className="ml-1 text-sm font-bold text-gray-800 hidden sm:inline">{review.starRating.toFixed(1)}</span>
                    </div>
                    
        
                    <NavLink

                    to={`/review/${review.id}`}  

                    className="block max-w-full text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition duration-150"

                >

                    View Details

                </NavLink>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;