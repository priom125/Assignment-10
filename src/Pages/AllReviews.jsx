import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Loading from "../components/Loading";
import FavReviewCard from "../components/FavReviewCard";

function AllReviews() {
  const [topReviews, setTopReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const Alldata = useLoaderData();

  useEffect(() => {
    setTopReviews(Alldata);
    setLoading(false);
  }, [Alldata]);

 
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://assignment-10-rose.vercel.app/all-review?search=${encodeURIComponent(searchText)}`
      );
      const data = await res.json();
      setTopReviews(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <Loading />
      </div>
    );
  }

  if (topReviews.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No reviews found.
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-900 mb-2">
            All Food Reviews
          </h2>
          <p className="text-xl text-gray-600 mt-5">
            Check out what our community is raving about.
          </p>
        </div>

      
        <form
          onSubmit={handleSearch}
          className="my-10 flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md mx-auto"
        >
          <svg
            className="h-[1em] opacity-50 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          <input
            type="search"
            placeholder="Search by food name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 outline-none"
          />
          <button
            type="submit"
            className="ml-3 bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
          {topReviews.map((review) => (
            <FavReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllReviews;
