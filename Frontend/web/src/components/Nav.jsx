import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Nav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    // Check if the user is authenticated by retrieving the status from localStorage
    const authStatus = localStorage.getItem("isAuthenticated"); // Example with localStorage
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const getCsrfToken = () => {
    const name = "csrftoken";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        credentials: "include", // Include cookies for session
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(), // Include CSRF token if needed
        },
      });

      const data = await response.json();
      if (data.success) {
        // Clear the authentication status from localStorage
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false); // Update state to reflect logout
        console.log("Logged out successfully");
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <>
      <motion.header
        className="body-font z-10"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="container mx-auto flex flex-wrap p-4 px-8 flex-col md:flex-row items-center bg-beige/80 shadow-lg rounded-b-2xl border-b-4 border-olive">
          <div className="flex flex-row items-center gap-3">
            <img
              src="/logo.png"
              alt="The Coffee Cup Logo"
              className="w-16 h-16 rounded-full border-2 border-olive shadow"
            />
            <p className="text-3xl font-bold text-olive tracking-wide">
              The Coffee Cup
            </p>
          </div>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center navbar text-lg font-medium gap-2">
            <Link
              to="/"
              className="mx-4 hover:text-olive transition-colors"
            >
              Home
            </Link>
            <Link
              to="/menus"
              className="mx-4 hover:text-olive transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/events"
              className="mx-4 hover:text-olive transition-colors"
            >
              Events
            </Link>
            <Link
              to="/chefs"
              className="mx-4 hover:text-olive transition-colors"
            >
              Chefs
            </Link>
            <Link
              to="/chatbot"
              className="mx-4 hover:text-olive transition-colors"
            >
              AI Assistance
            </Link>
            <Link
              to="/reviews"
              className="mx-4 hover:text-olive transition-colors"
            >
              Reviews
            </Link>
            <div className="relative">
              {!isAuthenticated &&
              <button
                onClick={toggleDropdown}
                className={`ml-4 bg-olive text-sand px-6 py-2 rounded-lg shadow hover:bg-black hover:text-beige transition-colors focus:outline-none`}
              >
                Login/Sign Up
              </button>
              }
              <AnimatePresence>
                {!isAuthenticated && isDropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-40 bg-beige shadow-xl rounded-lg z-30 border border-olive"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-black text-center rounded-t-lg hover:bg-sand border-b border-olive transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-black text-center rounded-b-lg hover:bg-sand transition-colors"
                    >
                      Register
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="ml-4 text-olive hover:text-black transition-colors"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </motion.header>
    </>
  );
}

export default Nav;
