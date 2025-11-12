import React, { useEffect, useState, useContext } from 'react';
import Loading from '../components/Loading';

import { AuthContext } from '../Auth/AuthProvider';
import ReviewCard from '../components/ReviewCard';

function MyFavorite() {
  const { user } = useContext(AuthContext);
 
  const [favoriteReviews, setFavoriteReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-favorite?email=${user.email}`)
        .then(res => res.json())
        .then(data => setFavoriteReviews(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div className="text-center py-10"><Loading/></div>;
  if (!user) return <div className="text-center py-10 text-gray-500">Please log in to see your favorite reviews.</div>;
  if (favoriteReviews.length === 0) return <div className="text-center py-10 text-gray-500">No favorite reviews available.</div>;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-900 mb-2">My Favorites</h2>
          <p className="text-xl text-gray-600">Reviews you saved with your account.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteReviews.map(review => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyFavorite;