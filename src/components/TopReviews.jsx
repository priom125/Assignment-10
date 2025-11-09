import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { Star } from 'lucide-react';
import ReviewCard from '../components/ReviewCard'
import Loading from './Loading';



function TopReviews({Alldata}) {
    const [topReviews, setTopReviews] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
 
        const sortedReviews = Alldata
            .sort((a, b) => b.starRating - a.starRating) 
            .slice(0, 6); 
        
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
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-5xl font-bold text-gray-900 mb-2">
                         Top-Rated Food Reviews
                    </h2>
                    <p className="text-xl text-gray-600">
                        Check out what our community is raving about.
                    </p>
                </div>

            
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topReviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>

             
                <div className="mt-12 text-center">
                    <NavLink
                        to="/all-reviews"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
                    >
                        Show All Reviews
                    </NavLink>
                </div>
            </div>
        </section>
    );
}

export default TopReviews;