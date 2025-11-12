import { Star } from "lucide-react";
import React from "react";
import { useLoaderData } from "react-router";


const DetailReview = () => {

  const review = useLoaderData();
  console.log(review);

  return (
    <div className=" min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl max-w-4xl w-full overflow-hidden">
 
        <img
          src={review.foodImageUrl}
          alt="Delicious Food"
          className="w-full h-64 md:h-96 object-cover"
        />


        <div className="p-6 md:p-10">
    
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {review.foodName}
          </h1>

     
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 text-gray-600">
            <p className="text-lg">
              <span className="font-semibold text-gray-700">Restaurant:</span>{" "}
             {review.restaurantName}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-700">Location:</span>{" "}
              {review.location}
            </p>
          </div>

     
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 text-lg" />
            <span className="ml-2 text-gray-700 font-medium">{review.starRating} / 5</span>
          </div>

          {/* Review Text */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Review
            </h3>
            <p className="text-gray-600 leading-relaxed">
          {review.reviewText}
            </p>
          </div>

          {/* Back Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition duration-200">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailReview;
