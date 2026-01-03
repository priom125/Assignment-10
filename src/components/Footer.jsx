import React from "react";
import { NavLink } from "react-router";
import { 
  Facebook, 
  Linkedin, 
  Twitter, 
  Instagram,
  Mail, 
  Phone, 
  MapPin,
  Heart,
  ExternalLink
} from "lucide-react";
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Navigation Links - Only working/functional routes
  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/all-reviews", label: "All Reviews" },
    { path: "/all-favorite", label: "All Favorites" },
  ];

  const resourceLinks = [
    { path: "/add-review", label: "Add Review" },
    { path: "/my-reviews", label: "My Reviews" },
    { path: "/favorite", label: "My Favorites" },
  ];

  // Contact Information
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "priom6046@gmail.com",
      href: "mailto:priom6046@gmail.com",
      color: "text-orange-400"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+880 1613-347903",
      href: "tel:+8801613347903",
      color: "text-green-400"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dhaka, Bangladesh",
      href: null,
      color: "text-red-400"
    }
  ];

  // Social Media Links - Replace with your actual social media URLs
  const socialLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://facebook.com/localeats", // Replace with actual URL
      color: "hover:text-blue-500",
      bgColor: "hover:bg-blue-500/10"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/localeats", // Replace with actual URL
      color: "hover:text-sky-400",
      bgColor: "hover:bg-sky-400/10"
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/localeats", // Replace with actual URL
      color: "hover:text-pink-500",
      bgColor: "hover:bg-pink-500/10"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/company/localeats", // Replace with actual URL
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-600/10"
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          
          {/* Brand Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">LE</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Local<span className="text-orange-500">Eats</span>
                </h2>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Discover authentic local culinary gems through our community-driven platform. Share reviews, find hidden treasures, and connect with fellow food enthusiasts.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span className="text-gray-400">by food lovers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              Quick Links
              <div className="h-1 w-8 bg-orange-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm transition-colors duration-200 ${
                        isActive
                          ? "text-orange-500 font-semibold"
                          : "text-gray-400 hover:text-white hover:translate-x-1"
                      } transition-transform`
                    }
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              Resources
              <div className="h-1 w-8 bg-orange-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm transition-colors duration-200 ${
                        isActive
                          ? "text-orange-500 font-semibold"
                          : "text-gray-400 hover:text-white hover:translate-x-1"
                      } transition-transform`
                    }
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              Get In Touch
              <div className="h-1 w-8 bg-orange-500 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
                    >
                      <contact.icon className={`w-5 h-5 ${contact.color} flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`} />
                      <div>
                        <p className="font-semibold text-gray-300 group-hover:text-white">
                          {contact.label}
                        </p>
                        <p className="text-gray-400 group-hover:text-gray-300">
                          {contact.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-3 text-sm text-gray-400">
                      <contact.icon className={`w-5 h-5 ${contact.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <p className="font-semibold text-gray-300">
                          {contact.label}
                        </p>
                        <p className="text-gray-400">{contact.value}</p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3 text-center md:text-left">
                Follow Us on Social Media
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-800 rounded-lg ${social.color} ${social.bgColor} transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup (Optional Enhancement) */}
            <div className="flex flex-col items-center md:items-end">
              <p className="text-sm text-gray-400 mb-2">
                Stay updated with latest reviews
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors duration-200 flex items-center gap-1">
                  Subscribe
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p className="text-center md:text-left">
              © {currentYear} <span className="text-orange-500 font-semibold">LocalEats</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <NavLink
                to="/privacy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms"
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </NavLink>
              <NavLink
                to="/about"
                className="hover:text-white transition-colors duration-200"
              >
                About Us
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;