import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLoaderData } from 'react-router';
import { Heart, ArrowRight, Sparkles, TrendingUp, Search, X, User as UserIcon } from 'lucide-react';
import { AuthContext } from '../Auth/AuthProvider';
import FavReviewCard from '../components/FavReviewCard';
import { ReviewCardSkeleton } from '../components/ReviewCard';

function MyFavorite() {
  const { user } = useContext(AuthContext);
  const AllFavoriteData = useLoaderData();
  const [favoriteReviews, setFavoriteReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const all = Array.isArray(AllFavoriteData) ? AllFavoriteData : [];

      if (user?.email) {
        const userFavorites = all.filter(item => item.email === user.email);
        setFavoriteReviews(userFavorites);
        setFilteredReviews(userFavorites);
      } else {
        setFavoriteReviews([]);
        setFilteredReviews([]);
      }

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [AllFavoriteData, user]);

  // Search filter
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = favoriteReviews.filter(review =>
        review.foodName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.restaurantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredReviews(filtered);
    } else {
      setFilteredReviews(favoriteReviews);
    }
  }, [searchQuery, favoriteReviews]);

  const handleRemoveFavorite = (reviewId) => {
    setFavoriteReviews(prev => prev.filter(fav => fav._id !== reviewId));
    setFilteredReviews(prev => prev.filter(fav => fav._id !== reviewId));
  };

  // Login Required State
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <UserIcon className="w-12 h-12 text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Login Required
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Please log in to view your favorite reviews and save your culinary discoveries.
          </p>
          <NavLink to="/login">
            <button className="px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2">
              Login to Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Header Section */}
      <section className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 dark:from-red-600 dark:via-pink-600 dark:to-red-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-lg animate-fade-in">
              <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
              <span className="text-white font-bold text-sm tracking-wide">
                YOUR COLLECTION
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-up">
              My Favorite Reviews
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8 animate-slide-up animation-delay-100">
              Your handpicked collection of amazing culinary experiences
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-6 animate-slide-up animation-delay-200">
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold">{favoriteReviews.length}</p>
                  <p className="text-sm text-white/80">Favorites</p>
                </div>
              </div>

              {favoriteReviews.length > 0 && (
                <>
                  <div className="h-8 w-px bg-white/30"></div>

                  <div className="flex items-center gap-2 text-white">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xl font-bold">
                        {(favoriteReviews.reduce((sum, r) => sum + r.starRating, 0) / favoriteReviews.length).toFixed(1)}★
                      </p>
                      <p className="text-sm text-white/80">Avg Rating</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar (only if there are favorites) */}
      {favoriteReviews.length > 0 && (
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40 shadow-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="flex-1 relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>

              {/* Add Review Button */}
              <NavLink to="/add-review">
                <button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap">
                  <Sparkles className="w-4 h-4" />
                  Add Review
                </button>
              </NavLink>
            </div>

            {/* Search Results Count */}
            {searchQuery && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Found <span className="font-bold text-gray-900 dark:text-white">{filteredReviews.length}</span> of {favoriteReviews.length} favorites
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            // Loading State
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <ReviewCardSkeleton key={index} />
              ))}
            </div>
          ) : favoriteReviews.length === 0 ? (
            // Empty State - No Favorites
            <div className="text-center py-20 animate-fade-in">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-red-500" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                No Favorites Yet
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto">
                Start building your collection! Explore reviews and save your favorite dishes for quick access later.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <NavLink to="/all-reviews">
                  <button className="px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2 group">
                    Discover Reviews
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </NavLink>

                <NavLink to="/add-review">
                  <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 inline-flex items-center gap-2">
                    Add Your Review
                    <Sparkles className="w-5 h-5" />
                  </button>
                </NavLink>
              </div>
            </div>
          ) : filteredReviews.length === 0 ? (
            // Empty State - No Search Results
            <div className="text-center py-20 animate-fade-in">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-orange-500" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                No Matching Favorites
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                We couldn't find any favorites matching "{searchQuery}"
              </p>

              <button
                onClick={() => setSearchQuery('')}
                className="px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2"
              >
                Clear Search
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            // Favorites Grid
            <>
              {/* Results Info */}
              <div className="mb-8 flex items-center justify-between">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-gray-900 dark:text-white">{filteredReviews.length}</span>
                  {' '}favorite{filteredReviews.length !== 1 ? 's' : ''}
                  {searchQuery && ' found'}
                </p>

                <NavLink to="/all-reviews">
                  <button className="px-6 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Discover More
                  </button>
                </NavLink>
              </div>

              {/* Favorites Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filteredReviews.map((favorite, index) => (
                  <div 
                    key={favorite._id} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <FavReviewCard 
                      review={favorite} 
                      onRemove={handleRemoveFavorite}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}

export default MyFavorite;