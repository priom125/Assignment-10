import React, {  useContext, useEffect } from 'react'
import ReviewRow from '../components/ReviewRow'
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Auth/AuthProvider';

function MyReview() {

  const reviews = useLoaderData();

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
                <ReviewRow
                  // 1. Mandatory unique key prop using MongoDB's unique ID
                  key={review._id}
                  // 2. Pass the entire review object as a prop
                  review={review}
                />
              ))}
        </tbody>
    </table>
</div>
</section>
  )
}

export default MyReview