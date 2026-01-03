import React, { use, useState } from "react";
import { NavLink } from "react-router";
import { Menu, X, User, LogOut, Heart, FileText, PlusCircle, Home, Star } from "lucide-react";
import logo from "../assets/logo.png";
import { AuthContext } from "../Auth/AuthProvider";

function Navbar() {
  const { user, logOut, loading } = use(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        setProfileDropdownOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Public navigation links (minimum 3 routes when logged out)
  const publicLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/all-reviews", label: "All Reviews", icon: Star },
    { path: "/all-favorite", label: "All Favorites", icon: Heart },
  ];

  // Protected navigation links (appear when logged in - minimum 5 total routes)
  const protectedLinks = [
    { path: "/add-review", label: "Add Review", icon: PlusCircle },
    { path: "/my-reviews", label: "My Reviews", icon: FileText },
    { path: "/favorite", label: "My Favorites", icon: Heart },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/"
              className="flex items-center gap-2 group"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">LE</span>
              </div>
              <span className="font-bold text-white text-xl hidden sm:block">
                Local<span className="text-orange-500">Eats</span>
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation - Public Links */}
          <div className="hidden lg:flex items-center gap-1">
            {publicLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              /* Advanced Profile Dropdown Menu */
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200 border border-gray-600"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-orange-500 ring-2 ring-orange-500/30">
                    <img
                      src={user?.photoURL || logo}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white font-semibold text-sm max-w-[120px] truncate">
                    {user?.displayName || user?.email?.split("@")[0]}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      profileDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* User Info Section */}
                      <div className="px-4 py-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-b border-gray-700">
                        <p className="text-white font-semibold truncate">
                          {user?.displayName || "User"}
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                          {user?.email}
                        </p>
                      </div>

                      {/* Protected Links */}
                      <div className="py-2">
                        {protectedLinks.map((link) => (
                          <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setProfileDropdownOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 ${
                                isActive
                                  ? "bg-orange-500/20 text-orange-400"
                                  : "text-gray-300 hover:bg-gray-700"
                              }`
                            }
                          >
                            <link.icon className="w-4 h-4" />
                            <span className="font-medium">{link.label}</span>
                          </NavLink>
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gray-700 mx-2" />

                      {/* Logout Button */}
                      <div className="py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-colors duration-150"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Login Button */
              <NavLink to="/login">
                <button className="px-6 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Login
                </button>
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 border-t border-gray-700 shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {/* Public Links */}
            {publicLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`
                }
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </NavLink>
            ))}

            {/* Protected Links (only when logged in) */}
            {user && (
              <>
                <div className="h-px bg-gray-700 my-2" />
                {protectedLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`
                    }
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </NavLink>
                ))}
              </>
            )}

            {/* User Section */}
            {user ? (
              <>
                <div className="h-px bg-gray-700 my-2" />
                <div className="px-4 py-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500">
                      <img
                        src={user?.photoURL || logo}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-gray-400 text-sm truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/20 text-red-400 rounded-lg font-semibold hover:bg-red-500/30 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="h-px bg-gray-700 my-2" />
                <NavLink to="/login" onClick={closeMobileMenu}>
                  <button className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2">
                    <User className="w-5 h-5" />
                    Login
                  </button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;