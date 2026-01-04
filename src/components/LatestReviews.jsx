import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { ArrowRight, Sparkles, Clock, TrendingUp } from 'lucide-react';
import ReviewCard, { ReviewCardGrid } from './ReviewCard';

function LatestReviews({ Alldata }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Alldata && Alldata.length > 0) {
        const sortedByDate = [...Alldata]
          .sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
          })
          .slice(0, 6);
        setReviews(sortedByDate);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [Alldata]);

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500/90 backdrop-blur-sm rounded-full mb-6 shadow-lg animate-fade-in">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span className="text-white font-bold text-sm tracking-wide">
              FRESH FROM THE COMMUNITY
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-slide-up">
            Latest Food Reviews
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-100">
            Fresh recommendations from our community of food enthusiasts. Discover hidden gems and authentic flavors in your neighborhood.
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 mt-8 animate-slide-up animation-delay-200">
            <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
            <div className="h-1 w-12 bg-amber-400 rounded-full"></div>
            <div className="h-1 w-12 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          // Loading State with Skeleton Cards
          <ReviewCardGrid isLoading={true} itemCount={6} />
        ) : reviews.length === 0 ? (
          // Empty State
          <div className="text-center py-20 animate-fade-in">
            <div className="relative w-24 h-24 mx-auto mb-8">
              {/* Animated Circle Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Clock className="w-10 h-10 text-orange-500" />
              </div>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No Reviews Yet
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto">
              Be the pioneer! Share your culinary adventures and inspire the community to discover amazing local eats.
            </p>

            {/* CTA Button */}
            <NavLink to="/add-review">
              <button className="px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2 group">
                Add Your First Review
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </NavLink>
          </div>
        ) : (
          <>
            {/* Reviews Grid - 3 columns matching card design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-fade-in">
              {reviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>

            {/* View All Section */}
            <div className="text-center space-y-6 animate-slide-up animation-delay-300">
              <NavLink to="/all-reviews">
                <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-3 group">
                  <span>Explore All Reviews</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </NavLink>

              {/* Review Count */}
              {Alldata && Alldata.length > 6 && (
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                    <span className="text-sm font-semibold">
                      Showing {reviews.length} of {Alldata.length} reviews
                    </span>
                  </div>
                </div>
              )}

              {/* Additional Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {Alldata?.length || 0}+
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Total Reviews
                    </p>
                  </div>
                </div>

                <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Community
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Driven Platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* CSS Animations */}
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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
}

export default LatestReviews;