import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { Star, Trophy, Crown, ArrowRight, Flame } from 'lucide-react';
import ReviewCard, { ReviewCardGrid } from '../components/ReviewCard';

function TopReviews({ Alldata }) {
  const [topReviews, setTopReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Alldata && Alldata.length > 0) {
        const sortedReviews = [...Alldata]
          .sort((a, b) => b.starRating - a.starRating)
          .slice(0, 6);
        setTopReviews(sortedReviews);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [Alldata]);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 backdrop-blur-sm rounded-full mb-6 shadow-lg animate-fade-in">
            <Trophy className="w-4 h-4 text-white animate-bounce" />
            <span className="text-white font-bold text-sm tracking-wide">
              TOP RATED
            </span>
            <Star className="w-4 h-4 text-white fill-white" />
          </div>

          {/* Main Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-slide-up">
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Top-Rated
            </span>{' '}
            Food Reviews
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-100">
            Experience the best of the best. These exceptional dishes have earned the highest ratings from our discerning community.
          </p>

          {/* Decorative Divider with Stars */}
          <div className="flex items-center justify-center gap-3 mt-8 animate-slide-up animation-delay-200">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <div className="h-1 w-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
            <Crown className="w-6 h-6 text-orange-500 fill-orange-500" />
            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            <Star className="w-5 h-5 text-red-500 fill-red-500" />
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          // Loading State with Skeleton Cards
          <ReviewCardGrid isLoading={true} itemCount={6} />
        ) : topReviews.length === 0 ? (
          // Empty State
          <div className="text-center py-20 animate-fade-in">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-amber-500" />
              </div>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No Top Reviews Yet
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto">
              Be among the first to discover and rate exceptional culinary experiences in your area!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NavLink to="/all-reviews">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2 group">
                  Discover Reviews
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </NavLink>

              <NavLink to="/add-review">
                <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 inline-flex items-center gap-2">
                  Rate a Dish
                  <Star className="w-5 h-5 text-amber-400" />
                </button>
              </NavLink>
            </div>
          </div>
        ) : (
          <>
            {/* Top Reviews Grid with Rankings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {topReviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className="relative animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Ranking Badge */}
                  {index < 3 && (
                    <div className="absolute -top-3 -left-3 z-20">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-800 ${
                        index === 0 
                          ? 'bg-gradient-to-br from-amber-400 to-yellow-500' 
                          : index === 1 
                          ? 'bg-gradient-to-br from-gray-300 to-gray-400'
                          : 'bg-gradient-to-br from-orange-400 to-amber-600'
                      }`}>
                        {index === 0 ? (
                          <Crown className="w-6 h-6 text-white fill-white" />
                        ) : (
                          <span className="text-white font-bold text-lg">#{index + 1}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Fire Badge for Top 3 */}
                  {index < 3 && (
                    <div className="absolute -top-3 -right-3 z-20">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <Flame className="w-5 h-5 text-white fill-white" />
                      </div>
                    </div>
                  )}

                  <ReviewCard review={review} />
                </div>
              ))}
            </div>

            {/* View All Section */}
            <div className="text-center space-y-6 animate-slide-up animation-delay-300 space-x-6">
              {/* Highlight Box */}
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border-2 border-amber-300 dark:border-amber-700 mb-6">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Showing Top {topReviews.length} Reviews
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Rated ★ - {topReviews[topReviews.length - 1]?.starRating?.toFixed(1)}★
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <NavLink to="/all-reviews">
                <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-3 group">
                  <span>View All Reviews</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </NavLink>

              {/* Additional Stats */}
              {Alldata && Alldata.length > 6 && (
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                  <span className="text-sm font-semibold">
                    Plus {Alldata.length - topReviews.length} more highly rated dishes
                  </span>
                </div>
              )}

              {/* Rating Distribution Info */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {(topReviews.reduce((sum, r) => sum + r.starRating, 0) / topReviews.length).toFixed(1)}★
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Average Rating
                    </p>
                  </div>
                </div>

                <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Excellence
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Community Verified
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

export default TopReviews;