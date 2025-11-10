import React from 'react'
import error from '../assets/Error.JPG'
import { NavLink } from 'react-router'

function ErrorPage() {
  return (
    <div>
        <div>
            <img src={error} alt="" />
        </div>
<div className="flex justify-center pb-20">
  <NavLink
    to="/"
    className="flex items-center justify-center w-2/12 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 cursor-pointer"
  >
    Back to Home
  </NavLink>
</div>

    </div>
  )
}

export default ErrorPage