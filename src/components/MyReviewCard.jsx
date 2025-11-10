import React from "react";

function MyReviewCard() {
  return (
    <div>
    
      <tbody className="bg-white divide-y divide-gray-200">
            {/* --- Example Row 1 --- */}
            <tr>
                <td className="px-6 py-4">
                    {/* Placeholder for the image */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Spicy Chicken Biryani
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Grand Mughal House
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Nov 9, 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                        Delete
                    </button>
                </td>
            </tr>
        </tbody>
    </div>
  );
}

export default MyReviewCard;
