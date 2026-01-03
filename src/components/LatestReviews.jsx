import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import { NavLink } from 'react-router';
import LatestCard from './LatestCard';

function LatestReviews({Alldata}) {
  const [date, setDate] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const sortedbyDates = Alldata
            .sort((a, b) => b.createdAt - a.createdAt) 
            .slice(0, 6); 
        
        setDate(sortedbyDates);
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="text-center py-10"><Loading/></div>;
    }

    if (date.length === 0) {
        return <div className="text-center py-10 text-gray-500">No featured reviews available.</div>;
    }
  return (
   <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-5xl font-bold text-gray-900 mb-2">
                         Latest Food Reviews
                    </h2>
                    <p className="text-xl text-gray-600">
                        Check out what our community is raving about.
                    </p>
                </div>

            
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {date.map(review => (
                        <LatestCard key={review.id} dates={review} />
                    ))}
                </div>

            </div>
        </section>
  )
}

export default LatestReviews