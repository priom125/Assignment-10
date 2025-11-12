import React from 'react';
import { NavLink } from 'react-router';

function ReviewRow({ review }) {
  return (
    <tr>
      <td className="px-6 py-4">
        {/* Food Image */}
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
          
            <img src="" className="w-full h-full object-cover" />
          
         
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
       <NavLink  to={`/update-review/${review._id}`} >
         <button
         
          className="text-indigo-600 hover:text-indigo-900 mr-3  cursor-pointer"
        >
          Edit
        </button>
       </NavLink>
        <button
        
          className="text-red-600 hover:text-red-900  cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ReviewRow;
