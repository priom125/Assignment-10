import React from 'react'

function AddReview() {
  return (
    <form className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    <h2 className="text-3xl font-bold mb-6 text-center text-[#231f40]">Submit Your Food Review</h2>

    {/* 1. Food Name */}
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Food Name</label>
        <input 
            type="text" 
      
            name="foodName" 
            placeholder="Food Name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
            required 
        />
    </div>

    {/* 2. Food Image */}
     <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Food Image URL</label>
        <input 
            type="text" 
      
            name="FoodImage" 
            placeholder="Food Image URL"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
            required 
        />
    </div>

    {/* 3. Restaurant Name */}
    <div className="mb-4">
        <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">Restaurant Name</label>
        <input 
            type="text" 
        
            name="restaurantName" 
            placeholder="Restaurant Name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
            required 
        />
    </div>

    {/* 4. Location */}
    <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (City/Area)</label>
        <input 
            type="text" 
     
            name="location" 
            placeholder="Location"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
        />
    </div>

    {/* 5. Star Rating */}
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Star Rating</label>
        <div className="flex justify-start space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="flex items-center">
                    <input 
                        type="radio" 
                        id={`star${star}`} 
                        name="starRating" 
                        value={star} 
                        className="h-4 w-4 text-[#ff7c08] border-gray-300 focus:ring-[#ff7c08]" 
                    />
                    <label htmlFor={`star${star}`} className="ml-1 text-sm text-gray-700">
                        {star} Star
                    </label>
                </div>
            ))}
        </div>
    </div>

    {/* 6. Review Text */}
    <div className="mb-6">
        <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">Review Text</label>
        <textarea 
            id="reviewText" 
            name="reviewText" 
            rows="4" 
            placeholder="Share your thoughts on the food and experience..."
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
            required
        ></textarea>
    </div>

    <button 
        type="submit" 
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-indigo-600 hover:bg-indigo-700 transition duration-150 cursor-pointer"
    >
        Submit Review
    </button>
</form>
  )
}

export default AddReview