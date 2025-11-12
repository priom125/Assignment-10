import React, {  useContext, useEffect, useState } from 'react'
import ReviewRow from '../components/ReviewRow'

import { AuthContext } from '../Auth/AuthProvider';

function MyReview() {

  const {user} = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

useEffect(() => {
  if(user?.email){
    fetch(`http://localhost:5000/my-review?email=${user.email}` )
    .then(res => res.json())
    .then(data => setReviews(data))
  }
}, [user]);


  return (
<section>
  <h1 className='text-5xl font-bold text-gray-900 mb-2 text-center mt-20'>My Reviews</h1>
     <div className="overflow-x-auto p-4 bg-white rounded-lg shadow-md mt-10">
   
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Food Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Food Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurant Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
    {reviews.map((review) => (
      <ReviewRow key={review._id} review={review} />
    ))}
        </tbody>
    </table>
</div>
</section>
  )
}

export default MyReview