import React from 'react';
import { NavLink } from 'react-router';
import { MapPin, Store, Star, User, Calendar, ArrowRight } from 'lucide-react';

// Main Review Card Component
function ReviewCard({ dates }) {
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-200 dark:border-gray-700 group">
      {/* Image Section - Fixed Height */}
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={dates.foodImageUrl}
          alt={dates.foodName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        
        {/* Rating Badge Overlay */}
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {dates.starRating}
          </span>
        </div>
      </div>

      {/* Content Section - Flexible Height */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Meta Info */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3 flex-wrap">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span className="font-medium">{dates.reviewerName}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(dates.createdAt)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
          {dates.foodName}
        </h3>

        {/* Description (if exists) */}
        {dates.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {dates.description}
          </p>
        )}

        {/* Location Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Store className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">
              {dates.restaurantName}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="truncate">{dates.location}</span>
          </div>
        </div>

        {/* Bottom Section - Pushed to bottom */}
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between gap-3">
            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {renderStars(dates.starRating)}
            </div>

            {/* View Details Button */}
            <NavLink
              to={`/review/${dates.id}`}
              className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-all duration-200 flex items-center gap-1.5 shadow-md hover:shadow-lg group/btn"
            >
              View Details
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton Loader Component
export function ReviewCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-200 dark:border-gray-700 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Meta Info Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        </div>

        {/* Location Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>

        {/* Bottom Section Skeleton */}
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
            <div className="h-9 bg-gray-300 dark:bg-gray-700 rounded-lg w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Grid Container Component for consistent layout
export function ReviewCardGrid({ children, isLoading = false, itemCount = 8 }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(itemCount)].map((_, index) => (
          <ReviewCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children}
    </div>
  );
}

// Alternative: Spinner Loader Component
export function ReviewCardSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 font-semibold">
        Loading delicious reviews...
      </p>
    </div>
  );
}

export default ReviewCard;