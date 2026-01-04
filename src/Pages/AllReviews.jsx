import React, { useEffect, useState } from 'react';
import { NavLink, useLoaderData } from 'react-router';
import { Search, SlidersHorizontal, Star, TrendingUp, X, Sparkles } from 'lucide-react';
import ReviewCard, { ReviewCardGrid } from '../components/ReviewCard';

function AllReviews() {
  const Alldata = useLoaderData();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // search / sort / filter
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [filterRating, setFilterRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Alldata && Alldata.length > 0) {
        setReviews(Alldata);
        setFilteredReviews(Alldata);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [Alldata]);

  // search / filter / sort logic
  useEffect(() => {
    let result = [...reviews];

    if (searchQuery.trim()) {
      result = result.filter(review =>
        review.foodName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.restaurantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterRating > 0) {
      result = result.filter(review => Math.floor(review.starRating) === filterRating);
    }

    switch (sortBy) {
      case 'latest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'highest':
        result.sort((a, b) => b.starRating - a.starRating);
        break;
      case 'lowest':
        result.sort((a, b) => a.starRating - b.starRating);
        break;
      default:
        break;
    }

    setFilteredReviews(result);
  }, [searchQuery, sortBy, filterRating, reviews]);

  // reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, filterRating]);

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('latest');
    setFilterRating(0);
  };

  const hasActiveFilters =
    searchQuery ||
    sortBy !== 'latest' ||
    filterRating > 0;

  // pagination calculations
  const totalPages = Math.ceil(filteredReviews.length / pageSize);

  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* ======= HERO SECTION ======= */}
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 rounded-full mb-6 shadow-lg">
            <Star className="w-4 h-4 text-white fill-white" />
            <span className="text-white font-bold text-sm">DISCOVER & EXPLORE</span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">All Food Reviews</h1>

          <p className="text-lg text-white/90 mb-8">
            Explore {reviews.length}+ authentic reviews from our passionate food community
          </p>

          <div className="flex justify-center gap-6">

            <div className="flex items-center gap-2 text-white">
              <TrendingUp className="w-6 h-6" />
              <div>
                <p className="text-xl font-bold">{reviews.length}+</p>
                <p className="text-sm text-white/80">Reviews</p>
              </div>
            </div>

            <div className="h-8 w-px bg-white/30"></div>

            <div className="flex items-center gap-2 text-white">
              <Star className="w-6 h-6 fill-white" />
              <div>
                <p className="text-xl font-bold">
                  {reviews.length > 0
                    ? (reviews.reduce((sum, r) => sum + r.starRating, 0) / reviews.length).toFixed(1)
                    : '0.0'}★
                </p>
                <p className="text-sm text-white/80">Avg Rating</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======= SEARCH + FILTER BAR ======= */}
      <section className="bg-white dark:bg-gray-800 sticky top-16 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">

          <div className="flex flex-col md:flex-row gap-4">

            {/* search bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by food, restaurant, or location..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <option value="latest">Latest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>

            {/* show filter panel */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>

          </div>

          {showFilters && (
            <div className="mt-3 flex flex-wrap gap-2">

              {[0, 5, 4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  onClick={() => setFilterRating(rating)}
                  className={`px-4 py-2 rounded-lg border ${
                    filterRating === rating ? 'bg-orange-500 text-white' : ''
                  }`}
                >
                  {rating === 0 ? 'All' : `${rating}★`}
                </button>
              ))}

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-auto px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ======= RESULTS SECTION ======= */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">

          {/* count and CTA */}
          <div className="mb-6 flex justify-between">
            <p>
              <b>{filteredReviews.length}</b> reviews found
            </p>

            <NavLink to="/add-review">
              <button className="px-5 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Add Review
              </button>
            </NavLink>
          </div>

          {/* show range */}
          {filteredReviews.length > 0 && (
            <p className="text-sm mb-4 text-gray-500">
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, filteredReviews.length)}
              {' '}of {filteredReviews.length}
            </p>
          )}

          {/* skeleton */}
          {loading ? (
            <ReviewCardGrid isLoading={true} itemCount={12} />
          ) : currentReviews.length === 0 ? (
            <h2 className="text-center text-xl mt-20">No reviews found</h2>
          ) : (
            <>
              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentReviews.map(review => (
                  <ReviewCard key={review._id || review.id} review={review} />
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-10 flex justify-center gap-2 flex-wrap">

                  <button
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => changePage(page)}
                      className={`px-4 py-2 border rounded-lg ${
                        currentPage === page ? 'bg-orange-500 text-white' : ''
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => changePage(currentPage + 1)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-40"
                  >
                    Next
                  </button>

                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default AllReviews;
