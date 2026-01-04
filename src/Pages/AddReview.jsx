import React, { useContext, useState } from "react";
import { 
  Utensils, 
  MapPin, 
  Store, 
  Star, 
  Image as ImageIcon, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";

/**
 * MOCK AUTHENTICATION CONTEXT
 * Included to ensure the file runs independently in this environment.
 */
const AuthContext = React.createContext({
  user: { email: 'user@example.com', displayName: 'Demo User' }
});

function AddReview() {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlereviewsubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const foodName = form.foodName.value;
    const foodImageUrl = form.FoodImage.value;
    const restaurantName = form.restaurantName.value;
    const location = form.location.value;
    const reviewText = form.reviewText.value;
    
    const dateObject = new Date();
    const formattedDateTime = dateObject.toLocaleString("en-US", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false,
    });

    const review = {
      foodName,
      foodImageUrl,
      restaurantName,
      location,
      starRating: rating,
      reviewText,
      createdAt: formattedDateTime,
      email: user?.email || "unregistered",
      reviewerName: user?.displayName || "unregistered",
    };

    try {
      const res = await fetch("http://localhost:5000/add-review", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      const data = await res.json();
      console.log(data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      // For demo purposes, we'll simulate success even if fetch fails
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl text-center border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Review Submitted!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for sharing your experience. Your review helps the community find the best flavors!
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg"
          >
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Utensils size={14} />
            Share Your Experience
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            What's on your <span className="text-orange-500 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Plate?</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Help fellow foodies by sharing your honest thoughts on the dishes you've tried.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            
            {/* Left: Info/Visual Sidebar */}
            <div className="lg:col-span-2 bg-gray-900 dark:bg-gray-950 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Review Tips</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                        <ImageIcon size={16} className="text-orange-400" />
                      </div>
                      <p className="text-sm text-gray-400"><strong className="text-white block">Visuals Matter</strong> Use high-quality image URLs to make your review stand out.</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center shrink-0">
                        <Star size={16} className="text-yellow-400" />
                      </div>
                      <p className="text-sm text-gray-400"><strong className="text-white block">Be Precise</strong> Ratings help others decide quickly. Be honest!</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <MessageSquare size={16} className="text-blue-400" />
                      </div>
                      <p className="text-sm text-gray-400"><strong className="text-white block">Describe Tastes</strong> Mention flavors, textures, and the ambiance.</p>
                    </li>
                  </ul>
                </div>

                <div className="relative z-10 mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                   <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">Posting as</p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold">
                        {user?.displayName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{user?.displayName || "Guest User"}</p>
                        <p className="text-xs text-gray-500">{user?.email || "No email provided"}</p>
                      </div>
                   </div>
                </div>
            </div>

            {/* Right: Form */}
            <form onSubmit={handlereviewsubmit} className="lg:col-span-3 p-8 md:p-12">
              <div className="space-y-6">
                
                {/* Food & Restaurant */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Food Name</label>
                    <div className="relative">
                      <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text" name="foodName" required placeholder="e.g. Signature Ramen"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Restaurant Name</label>
                    <div className="relative">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text" name="restaurantName" required placeholder="e.g. Tokyo Delight"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Image URL & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Food Image URL</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="url" name="FoodImage" required placeholder="https://..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text" name="location" placeholder="City or Area"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Interactive Star Rating */}
                <div className="space-y-3 bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                  <label className="text-sm font-bold text-orange-800 dark:text-orange-400 block">How would you rate it?</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          size={32}
                          className={`${
                            index <= (hover || rating) 
                              ? "fill-orange-500 text-orange-500" 
                              : "text-gray-300 dark:text-gray-600"
                          } transition-colors duration-200`}
                        />
                      </button>
                    ))}
                    <span className="ml-4 text-lg font-black text-orange-600 dark:text-orange-400">
                      {rating > 0 ? `${rating}.0` : "Select"}
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Your Honest Review</label>
                  <textarea
                    name="reviewText" required rows="4"
                    placeholder="Tell us about the texture, the heat, the service..."
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className={`w-full py-4 px-6 flex items-center justify-center gap-3 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 ${
                    isSubmitting || rating === 0 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-orange-500/25"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      SUBMIT YOUR REVIEW
                      <Send size={18} />
                    </>
                  )}
                </button>
                
                {rating === 0 && (
                  <p className="flex items-center justify-center gap-1.5 text-xs text-red-500 font-bold animate-pulse">
                    <AlertCircle size={14} /> Please select a star rating to proceed
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReview;