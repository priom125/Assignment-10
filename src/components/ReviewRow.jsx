import React from 'react';
import { NavLink } from 'react-router';
import Swal from 'sweetalert2';

function ReviewRow({ review, onDelete }) {

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-10-rose.vercel.app/all-review/${review._id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your review has been deleted.",
                "success"
              );
              if (onDelete) onDelete(review._id);
            }
          })
          .catch(err => console.error("Delete error:", err));
      }
    });
  };

  console.log(review);

  const date = review.createdAt.split(" T")[0];
  
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">

      <td className="px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-4">
        <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src={review.foodImageUrl}
            className="w-full h-full object-cover"
            alt={review.foodName}
            loading="lazy"
          />
        </div>
      </td>


      <td className="px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-4">
        <p className="text-xs xs:text-sm sm:text-base md:text-lg font-medium text-gray-900 line-clamp-2 max-w-[100px] xs:max-w-[120px] sm:max-w-[150px] md:max-w-none">
          {review.foodName}
        </p>
      </td>


      <td className="xs:table-cell px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-4">
        <p className="text-xs xs:text-sm sm:text-base text-gray-600 line-clamp-1 max-w-[80px] xs:max-w-[100px] sm:max-w-[150px] md:max-w-none">
          {review.restaurantName}
        </p>
      </td>


      <td className="sm:table-cell px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-4">
        <p className="text-xs sm:text-sm md:text-base text-gray-500 whitespace-nowrap">
        {date}
        </p>
      </td>

   
      <td className="px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-4 text-right">
        <div className="flex flex-col xs:flex-row gap-1.5 xs:gap-2 sm:gap-3 justify-end">
          <NavLink to={`/update-review/${review._id}`}>
            <button className="w-full xs:w-auto px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 text-xs xs:text-sm sm:text-base font-medium text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded transition-all duration-200 whitespace-nowrap">
              Edit
            </button>
          </NavLink>
          <button
            onClick={handleDelete}
            className="w-full xs:w-auto px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 text-xs xs:text-sm sm:text-base font-medium text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-all duration-200 whitespace-nowrap"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ReviewRow;
