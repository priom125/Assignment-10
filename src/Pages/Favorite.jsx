import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import ReviewCard from '../components/ReviewCard';
import { useLoaderData } from 'react-router';

function Favorite() {

    const [favoriteReviews, setFavoriteReviews] = useState([]);

    const AllFavoriteData = useLoaderData();

    useEffect(() => {
        setFavoriteReviews(Array.isArray(AllFavoriteData) ? AllFavoriteData : []);
        setLoading(false);
    }, [AllFavoriteData]);

    const [loading, setLoading] = useState(true);
    if (loading) {
        return <div className="text-center py-10"><Loading/></div>;
    }

    if (favoriteReviews.length === 0) {
        return <div className="text-center py-10 text-gray-500">No favorite reviews available.</div>;
    }
  return (
   <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-5xl font-bold text-gray-900 mb-2">
                        Favorite Food Reviews
                    </h2>
                    <p className="text-xl text-gray-600">
                        Check out what our community is raving about.
                    </p>
                </div>

            
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
                    {favoriteReviews.map(review => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
                </div>
                </section>
  )
}

export default Favorite