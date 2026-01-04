import React, { useEffect, useState, useContext } from 'react'
import Loading from '../components/Loading';
import FavReviewCard from '../components/FavReviewCard';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Auth/AuthProvider';
import { Heart } from 'lucide-react';

function Favorite() {

    const { user } = useContext(AuthContext);
    const [favoriteReviews, setFavoriteReviews] = useState([]);
    const AllFavoriteData = useLoaderData();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      
        const all = Array.isArray(AllFavoriteData) ? AllFavoriteData : [];

        if (!AllFavoriteData) {
          
            return;
        }

        if (user?.email) {
           
            setFavoriteReviews(all.filter(item => item.email === user.email));
        } else {
           
            setFavoriteReviews([]);
        }

        setLoading(false);
    }, [AllFavoriteData, user]);

    if (loading) {
        return <div className="text-center py-10"><Loading/></div>;
    }

    if (!user) {
        return <div className="text-center py-10 text-gray-500">Please log in to see your favorite reviews.</div>;
    }

    if (favoriteReviews.length === 0) {
        return <div className="text-center py-10 text-gray-500">No favorite reviews available.</div>;
    }
  return (
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300">
            {/* Hero Header */}
            <div className="relative bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-red-500 rounded-full blur-3xl" />
                </div>
                
                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm font-bold mb-6">
                        <Heart size={16} fill="currentColor" />
                        MY COLLECTION
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
                        Your <span className="text-orange-500">Favorite</span> Finds
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        A curated gallery of the most delicious experiences you've saved. Rediscover your top-rated flavors and plan your next visit.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {favoriteReviews.length === 0 ? (
                    <div className="py-20 text-center">
                        <div className="relative inline-block mb-8">
                            <div className="absolute inset-0 bg-orange-100 dark:bg-orange-900/20 blur-2xl rounded-full" />
                            <Utensils className="w-24 h-24 text-gray-300 dark:text-gray-700 relative" />
                            <Search className="w-10 h-10 text-orange-500 absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Favorites Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                            You haven't saved any food reviews to your collection. Start exploring and click the heart icon!
                        </p>
                        <button className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-orange-500 text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl">
                            Explore Reviews <ArrowRight size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                        {favoriteReviews.map(review => (
                            <FavReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                )}
            </section>

            {/* Statistics Footer */}
            {favoriteReviews.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
                    <div className="bg-gray-100 dark:bg-gray-800/50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                            <div className="text-3xl font-black text-orange-500">{favoriteReviews.length}</div>
                            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest leading-tight">
                                Items in your<br/>Collection
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-500 max-w-xs text-center md:text-left">
                            Keep adding more to discover trends in your personal taste and dining preferences.
                        </p>
                        <button className="text-sm font-bold text-gray-900 dark:text-white hover:underline">
                            Export My List
                        </button>
                    </div>
                </div>
            )}
        </div>
  )
}

export default Favorite