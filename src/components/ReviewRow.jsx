import React from 'react';
import { NavLink } from 'react-router';
import { 
  Trash2, 
  Edit3, 
  Calendar, 
  Store, 
  ChevronRight, 
  ExternalLink,
  Search,
  Filter,
  MoreVertical,
  Utensils
} from 'lucide-react';

function ReviewRow({ review, onEdit, onDelete }) {
  return (
  <tr className="hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-12 w-12 flex-shrink-0 relative">
            <img 
              className="h-12 w-12 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-gray-700" 
              src={review.foodImageUrl} 
              alt={review.foodName} 
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
              {review.foodName}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Utensils size={10} /> ID: {review._id.substring(0, 8)}...
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <Store size={14} className="text-orange-500" />
          <span className="font-medium">{review.restaurantName}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-sm text-gray-900 dark:text-gray-300 flex items-center gap-1.5">
            <Calendar size={14} className="text-gray-400" />
            {review.createdAt?.split(',')[0]}
          </span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Posted Date</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => onEdit(review)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
            title="Edit Review"
          >
            <Edit3 size={18} />
          </button>
          <button 
            onClick={() => onDelete(review._id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
            title="Delete Review"
          >
            <Trash2 size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">
            <MoreVertical size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ReviewRow;
