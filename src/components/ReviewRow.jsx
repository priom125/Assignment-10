import React, { useState } from 'react';
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
              // Call parent callback to remove from list
              if (onDelete) onDelete(review._id);
            }
          })
          .catch(err => console.error("Delete error:", err));
      }
    });
  };

  console.log(review);
  
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={review.foodImageUrl} className="w-full h-full object-cover" alt={review.foodName} />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {review.foodName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {review.restaurantName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {review.createdAt}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <NavLink to={`/update-review/${review._id}`}>
          <button className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer">
            Edit
          </button>
        </NavLink>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-900 cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ReviewRow;
