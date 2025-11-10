import React, { useEffect, useState } from 'react';
import { NavLink, useLoaderData } from 'react-router';
import { Star } from 'lucide-react';
import ReviewCard from '../components/ReviewCard'
import Loading from '../components/Loading';


function AllReviews() {
      const [topReviews, setTopReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const Alldata = useLoaderData();


    useEffect(() => {
 
        const sortedReviews = Alldata
            .sort((a, b) => b.starRating - a.starRating) 
          
        
        setTopReviews(sortedReviews);
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="text-center py-10"><Loading/></div>;
    }

    if (topReviews.length === 0) {
        return <div className="text-center py-10 text-gray-500">No featured reviews available.</div>;
    }
  return (
            <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-5xl font-bold text-gray-900 mb-2">
                         Top-Rated Food Reviews
                    </h2>
                    <p className="text-xl text-gray-600">
                        Check out what our community is raving about.
                    </p>
                </div>

            
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
                    {topReviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
                </div>
                </section>
  )
};

export default AllReviews