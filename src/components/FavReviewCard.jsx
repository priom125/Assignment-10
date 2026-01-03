import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { MapPin, Store, Star, Heart, ArrowRight, User, Calendar, Trash2 } from 'lucide-react';
import { AuthContext } from '../Auth/AuthProvider';

const FavReviewCard = ({ review, onRemove }) => {
  const { user } = useContext(AuthContext);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          className="w-4 h-4 fill-amber-400 text-amber-400" 
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <Star className="w-4 h-4 text-gray-300 absolute" />
          <div className="overflow-hidden w-2 absolute">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
        </div>
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          className="w-4 h-4 text-gray-300" 
        />
      );
    }

    return stars;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleRemoveFavorite = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (isRemoving) return;
    
    setIsRemoving(true);

    try {
      const res = await fetch(`http://localhost:5000/all-favorite/${review._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Failed to remove favorite:', res.status, errText);
        setIsRemoving(false);
        return;
      }

      setShowSuccess(true);
      
      // Call parent component's remove handler
      setTimeout(() => {
        if (onRemove) {
          onRemove(review._id);
        }
      }, 500);

    } catch (err) {
      console.error('Error removing favorite:', err);
      setIsRemoving(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border-2 border-red-200 dark:border-red-900/30 group relative ${showSuccess ? 'scale-95 opacity-50' : ''}`}>
      {/* Favorite Badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 rounded-full shadow-lg">
          <Heart className="w-3.5 h-3.5 text-white fill-white" />
          <span className="text-white font-bold text-xs">FAVORITE</span>
        </div>
      </div>

      {/* Remove Button */}
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleRemoveFavorite}
          disabled={isRemoving}
          className="p-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200 shadow-lg hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
          title="Remove from favorites"
        >
          {isRemoving ? (
            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Trash2 className="w-5 h-5 text-red-500 group-hover/btn:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {/* Image Section - Fixed Height */}
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={review.foodImageUrl}
          alt={review.foodName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        
        {/* Rating Badge Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-gray-900 dark:text-white">
          
          </span>
        </div>
      </div>

      {/* Content Section - Flexible Height */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Meta Info */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3 flex-wrap">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span className="font-medium">{review.reviewerName}</span>
          </div>
          {review.createdAt && (
            <>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(review.createdAt)}</span>
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
          {review.foodName}
        </h3>

        {/* Review Text (if exists) */}
        {review.reviewText && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {review.reviewText}
          </p>
        )}

        {/* Location Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Store className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">
              {review.restaurantName}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="truncate">{review.location}</span>
          </div>
        </div>

        {/* Bottom Section - Pushed to bottom */}
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between gap-3">
            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {renderStars(review.starRating)}
            </div>

            {/* View Details Button */}
            <NavLink
              to={`/review/${review._id}`}
              className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-all duration-200 flex items-center gap-1.5 shadow-md hover:shadow-lg group/btn"
            >
              View Details
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 flex items-center justify-center rounded-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Removed from favorites
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavReviewCard;