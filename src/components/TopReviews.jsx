import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Star } from "lucide-react";
import ReviewCard from "../components/ReviewCard";
import Loading from "./Loading";

function TopReviews({ Alldata }) {
  const [topReviews, setTopReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sortedReviews = Alldata.sort(
      (a, b) => b.starRating - a.starRating
    ).slice(0, 6);

    setTopReviews(sortedReviews);
    setLoading(false);
  }, []);

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
        No featured reviews available.
      </div>
    );
  }

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Top-Rated Food Reviews
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Check out what our community is raving about.
          </p>
        </div>


        <div
          className="
        grid 
        grid-cols-1 
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3 
        gap-6 
        sm:gap-8 
        lg:gap-10
      "
        >
          {topReviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>

    
        <div className="mt-10 sm:mt-14 text-center">
          <NavLink
            to="/all-reviews"
            className="
          inline-flex 
          items-center 
          px-5 
          sm:px-7 
          py-2.5 
          sm:py-3.5 
          text-sm 
          sm:text-base 
          font-semibold 
          rounded-md 
          shadow-sm 
          text-white 
          bg-indigo-600 
          hover:bg-indigo-700 
          focus:ring-2 
          focus:ring-indigo-500 
          focus:outline-none 
          transition 
          duration-200
        "
          >
            Show All Reviews
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default TopReviews;
