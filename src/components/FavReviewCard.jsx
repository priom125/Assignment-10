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
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700 group relative">
            {/* Status Badge */}
            <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wider text-gray-700 dark:text-gray-200 uppercase">Featured</span>
                </div>
            </div>

            {/* Favorite Action Button Overlay */}
            <div className="absolute top-4 right-4 z-10">
                <div className="p-2.5 bg-white dark:bg-gray-900 rounded-full shadow-lg border border-gray-100 dark:border-gray-700">
                    <Heart size={18} className="text-red-500 fill-red-500" />
                </div>
            </div>

            <div className="relative h-48 overflow-hidden">
                <img 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    src={review.foodImageUrl} 
                    alt={review.foodName} 
                />
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <User size={10} className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{review.reviewerName}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{review.foodName}</h3>
                
                <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Store size={14} className="text-orange-500" />
                        <span className="font-medium truncate">{review.restaurantName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="truncate">{review.location}</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex gap-0.5">{renderStars(review.starRating)}</div>
                    <div className="flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400">
                        VIEW <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </div>
  );
};

export default FavReviewCard;