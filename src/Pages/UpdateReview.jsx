import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";

function UpdateReview() {
  const { user } = useContext(AuthContext);
  const review = useLoaderData();

  if (!review) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const handleUpdateReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const foodName = form.foodName.value;
    const foodImageUrl = form.FoodImage.value;
    const restaurantName = form.restaurantName.value;
    const location = form.location.value;
    const starRating = form.starRating.value;
    const reviewText = form.reviewText.value;
    const email = user?.email || "unregistered";
    const reviewerName = user?.displayName || "unregistered";
    const updateReview = {
      foodName,
      foodImageUrl,
      restaurantName,
      location,
      starRating,
      reviewText,
      createdAt: new Date().toLocaleString(),
      email,
      reviewerName,
    };

    const url = `http://localhost:5000/all-review/${review._id}`;
 

    fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateReview),
    })
      .then(async (res) => {
        const text = await res.text().catch(() => "");
        console.log("Response status:", res.status, "body:", text);
        if (!res.ok) throw new Error(`HTTP ${res.status} - ${text}`);
        return JSON.parse(text || "{}");
      })
      .then((data) => {
        console.log("Updated:", data);
      })
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <div>
      <h1 className="text-5xl font-bold text-gray-900 mb-2 text-center mt-20">
        Update Review
      </h1>
      <div>
        <form
          onSubmit={handleUpdateReview}
          className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10"
        >
          {/* 1. Food Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
              placeholder="Food Name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue={review.foodName}
              required
            />
          </div>

          {/* 2. Food Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Food Image URL
            </label>
            <input
              type="text"
              name="FoodImage"
              placeholder="Food Image URL"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue={review.foodImageUrl}
              required
            />
          </div>

          {/* 3. Restaurant Name */}
          <div className="mb-4">
            <label
              htmlFor="restaurantName"
              className="block text-sm font-medium text-gray-700"
            >
              Restaurant Name
            </label>
            <input
              type="text"
              name="restaurantName"
              placeholder="Restaurant Name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue={review.restaurantName}
              required
            />
          </div>

          {/* 4. Location */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location (City/Area)
            </label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue={review.location}
            />
          </div>

          {/* 5. Star Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Star Rating
            </label>
            <div className="flex justify-start space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="flex items-center">
                  <input
                    type="radio"
                    id={`star${star}`}
                    name="starRating"
                    value={star}
                    className="h-4 w-4 text-[#ff7c08] border-gray-300 focus:ring-[#ff7c08]"
                    defaultChecked={parseInt(review.starRating) === star}
                  />
                  <label
                    htmlFor={`star${star}`}
                    className="ml-1 text-sm text-gray-700"
                  >
                    {star} Star
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Review Text */}
          <div className="mb-6">
            <label
              htmlFor="reviewText"
              className="block text-sm font-medium text-gray-700"
            >
              Review Text
            </label>
            <textarea
              id="reviewText"
              name="reviewText"
              rows="4"
              placeholder="Share your thoughts on the food and experience..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue={review.reviewText}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-indigo-600 hover:bg-indigo-700 transition duration-150 cursor-pointer"
          >
            Update Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateReview;
