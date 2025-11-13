import React, { useEffect, useState, useContext } from 'react'
import Loading from '../components/Loading';
import FavReviewCard from '../components/FavReviewCard';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Auth/AuthProvider';
import ReviewCard from '../components/ReviewCard';

function Favorite() {

    const { user } = useContext(AuthContext);

    const AllFavoriteData = useLoaderData();
    const [loading, setLoading] = useState(true);


    

    if (AllFavoriteData.length === 0) {
        return <div className="text-center py-10 text-gray-500">No favorite reviews available.</div>;
    }
  return (
<section className="py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-10 sm:mb-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
        All Favorite Food Reviews
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-600">
        Reviews saved by all accounts.
      </p>
    </div>

    {/* Reviews Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-full">
      {AllFavoriteData.map(review => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  </div>
</section>

  )
}

export default Favorite