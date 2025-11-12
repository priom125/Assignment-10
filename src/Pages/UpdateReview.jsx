import React, { use } from 'react'
import { useLoaderData } from 'react-router';

function UpdateReview() {
    const review = useLoaderData();
    console.log(review);
  return (
    <div>
        <h1 className='text-5xl font-bold text-gray-900 mb-2 text-center mt-20'>Update Review</h1>
        <div>
            
        </div>
    </div>
  )
}

export default UpdateReview