import React from "react";
import { Star, MapPin, Store, ArrowLeft, Calendar, User, Quote, Share2, Heart } from "lucide-react";

/**
 * MOCK DATA FOR PREVIEW
 * Since useLoaderData() requires a router context, we provide a fallback for the preview.
 */
const DetailReview = ({ review: propReview }) => {
  // Mock fallback if review is not provided via props or loader
  const review = propReview || {
    foodName: "Signature Spicy Tonkotsu Ramen",
    restaurantName: "Ichiraku Ramen House",
    location: "Shibuya, Tokyo",
    starRating: 4.9,
    foodImageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=1200",
    reviewText: "The broth had an incredible depth of flavor, simmered for 24 hours. The noodles were perfectly al dente, and the chashu pork literally melted in my mouth. It's easily one of the best bowls of ramen I've had this year. The atmosphere was cozy and authentic.",
    reviewerName: "Jonathan Doe",
    createdAt: "2024-05-20T10:00:00.000Z"
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={20} 
          className={i < fullStars ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"} 
        />
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-semibold text-sm">
            <ArrowLeft size={18} />
            BACK TO EXPLORE
          </button>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all">
              <Share2 size={20} />
            </button>
            <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image and Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
              <img
                src={review.foodImageUrl}
                alt={review.foodName}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center justify-between border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {review.starRating}
                    </div>
                    <div>
                      <div className="flex gap-0.5">{renderStars(review.starRating)}</div>
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter mt-1">Overall Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details and Content */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold rounded-full uppercase tracking-widest">
                Food Review
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                {review.foodName}
              </h1>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Store className="text-orange-500" size={20} />
                  <span className="text-xs font-bold text-gray-400 uppercase">Restaurant</span>
                </div>
                <p className="font-bold text-gray-800 dark:text-gray-200">{review.restaurantName}</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-red-500" size={20} />
                  <span className="text-xs font-bold text-gray-400 uppercase">Location</span>
                </div>
                <p className="font-bold text-gray-800 dark:text-gray-200">{review.location}</p>
              </div>
            </div>

            {/* Review Body */}
            <div className="relative p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <Quote className="absolute top-4 right-4 text-gray-100 dark:text-gray-700 w-24 h-24 -z-0" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">The Verdict</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg italic">
                  "{review.reviewText}"
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{review.reviewerName}</p>
                    <p className="text-xs text-gray-500">Verified Reviewer</p>
                  </div>
                </div>
                <div className="text-right">
                   <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                      <Calendar size={14} />
                      {formatDate(review.createdAt)}
                   </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex-1 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white transition-all shadow-xl active:scale-95">
                SHARE THIS REVIEW
              </button>
              <button className="flex-1 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95">
                ADD TO WISHLIST
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Mock wrapper for rendering in the preview
export default function App() {
  return <DetailReview />;
}