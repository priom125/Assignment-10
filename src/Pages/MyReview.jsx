import React, {  useContext, useEffect, useState } from 'react'
import ReviewRow from '../components/ReviewRow'
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Auth/AuthProvider';
import { 
  Trash2, 
  Edit3, 
  Calendar, 
  Store, 
  ChevronRight, 
  ExternalLink,
  Search,
  Filter,
  MoreVertical,
  Utensils
} from 'lucide-react';

function MyReview() {

  const reviews = useLoaderData();
 const [review, setReviews] = useState([
    // Mock data for visual preview
    { _id: '101', foodName: 'Beef Wagyu Burger', restaurantName: 'The Grill House', createdAt: '05/22/2024, 14:30', foodImageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd' },
    { _id: '102', foodName: 'Lobster Thermidor', restaurantName: 'Ocean Catch', createdAt: '05/20/2024, 19:15', foodImageUrl: 'https://images.unsplash.com/photo-1553163147-622820be2931' },
    { _id: '103', foodName: 'Matcha Mille Crepe', restaurantName: 'Tea Garden', createdAt: '05/18/2024, 11:00', foodImageUrl: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7' },
  ]);
  const {user} = useContext(AuthContext);

useEffect(() => {
  if(user?.email){
    fetch(`http://localhost:5000/all-review?email=${user.email}` ,{
      headers:{
          authorization: `Bearer ${user.accessToken}`
      }
   } ).then(res => res.json())
      .then(data => {
        console.log(data);
      })
  }
}, [user?.email,user?.accessToken]);

const handleDelete = (id) => {
    // Implement delete logic
    setReviews(review.filter(r => r._id !== id));
  };

  const handleEdit = (review) => {
    console.log("Editing:", review);
  };
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              My <span className="text-orange-500">Reviews</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Manage and track all the food experiences you've shared.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search my reviews..." 
                  className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all w-64"
                />
             </div>
             <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition-all">
                <Filter size={20} />
             </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                  <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Food & Dish
                  </th>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Establishment
                  </th>
                  <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Date Published
                  </th>
                  <th scope="col" className="px-6 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Control
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <ReviewRow 
                      key={review._id} 
                      review={review} 
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                         <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-300">
                            <Utensils size={32} />
                         </div>
                         <h3 className="text-lg font-bold text-gray-900 dark:text-white">No reviews found</h3>
                         <p className="text-sm text-gray-500 max-w-xs mx-auto">
                            You haven't written any reviews yet. Go to the explore page to share your first experience!
                         </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination Mockup */}
          <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Showing {reviews ? reviews.length : 0} total reviews
            </p>
            <div className="flex gap-2">
               <button className="px-4 py-1.5 text-xs font-bold text-gray-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-not-allowed">
                  Previous
               </button>
               <button className="px-4 py-1.5 text-xs font-bold text-white bg-orange-500 rounded-lg shadow-md shadow-orange-500/20">
                  Next
               </button>
            </div>
          </div>
        </div>
        
        {/* Quick Action Info */}
        <div className="mt-8 flex items-center justify-between p-6 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/20">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
                 <ExternalLink size={20} />
              </div>
              <p className="text-sm text-orange-900 dark:text-orange-200 font-medium">
                 Did you know? Reviews with more than 3 photos get 4x more engagement.
              </p>
           </div>
           <button className="text-sm font-bold text-orange-600 dark:text-orange-400 hover:underline">
              View Insights
           </button>
        </div>
      </div>
    </div>
  )
}

export default MyReview