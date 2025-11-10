import React from 'react'

function MyReview() {
  return (
<section>
  <h1 className='text-5xl font-bold text-gray-900 mb-2 text-center mt-20'>My Reviews</h1>
     <div className="overflow-x-auto p-4 bg-white rounded-lg shadow-md mt-10">
   
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Food Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Food Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurant Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
            </tr>
        </thead>
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
    </table>
</div>
</section>
  )
}

export default MyReview