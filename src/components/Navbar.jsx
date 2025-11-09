import React, { use } from "react";
import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import { AuthContext } from "../Auth/AuthProvider";

function Navbar() {
  const { user,logOut } = use(AuthContext);


  const handleLogout = () => {
      logOut()
      .then(() => {
 
}).catch((error) => {
  console.log(error);
});

  }



const userDropdown = (
  <div className="dropdown dropdown-end">

    <div
      tabIndex={0}
      role="button"
      className="btn btn-ghost btn-circle avatar transition-transform duration-200 hover:scale-105" 
    >
      <div className="w-10 rounded-full border-2 border-primary ring ring-primary ring-offset-base-100 ring-offset-2"> 
  
        <img
          alt="User Avatar"
      
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        />
      </div>
    </div>

  
    <ul
      tabIndex={0}
      className="menu menu-compact dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-56 p-2 shadow-xl border border-gray-200" 
   
    >
 
      <li>
        <NavLink 
          to="/add-review" 
          className="hover:bg-primary/10 active:bg-primary/20 rounded-md py-2 px-3 transition-colors duration-150"
        >
          ➕ Add Review
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/my-reviews" 
          className="hover:bg-primary/10 active:bg-primary/20 rounded-md py-2 px-3 transition-colors duration-150"
        >
          ⭐ My Reviews
        </NavLink>
      </li>
      
 
      <div className="divider my-1 h-px bg-gray-300"></div> 
      

      <li>
        <a 
          onClick={handleLogout}
          className="hover:bg-error/10 text-error active:bg-error/20 rounded-md py-2 px-3 transition-colors duration-150" 
       
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Logout
        </a>
      </li>
    </ul>
  </div>
);
  return (
    <div className="navbar bg-[#27304b] shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2"
          >
            <li className="text-white font-semibold">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="text-white font-semibold">
              <NavLink to="/all-reviews">All Reviews</NavLink>
            </li>
          </ul>
        </div>
        <NavLink to="/" className="font-bold text-white text-2xl">
          Local<span className="text-[#fb5350]">Eats</span>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li className="text-white font-semibold">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="text-white font-semibold">
            <NavLink to="/all-reviews">All Reviews</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
   
          userDropdown
        ) : (
       
          <NavLink to="/login">
            <button className="btn">Login</button>
          </NavLink>
        )}
      </div>
      
    </div>
  );
}

export default Navbar;
