import React, {  useContext, useEffect, useState } from 'react'
import ReviewRow from '../components/ReviewRow'

import { AuthContext } from '../Auth/AuthProvider';

function MyReview() {

  const {user} = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

useEffect(() => {
  if(user?.email){
    fetch(`https://assignment-10-rose.vercel.app/my-review?email=${user.email}` )
    .then(res => res.json())
    .then(data => setReviews(data))
  }
}, [user]);

const handleDeleteReview = (id) => {
  setReviews(reviews.filter(r => r._id !== id));
};

  return (
<section className="px-4 sm:px-6 lg:px-8 py-10">
  {/* Section Heading */}
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
    My Reviews
  </h1>

  {/* Table wrapper with horizontal scroll */}
  <div className="overflow-x-auto  rounded-lg shadow-md">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
            Food Image
          </th>
          <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
            Food Name
          </th>
          <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
            Restaurant Name
          </th>
          <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
            Posted Date
          </th>
          <th className="px-4 py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {reviews.map((review) => (
          <ReviewRow
            key={review._id}
            review={review}
            onDelete={handleDeleteReview}
          />
        ))}
      </tbody>
    </table>
  </div>
</section>


  )
}

export default MyReview