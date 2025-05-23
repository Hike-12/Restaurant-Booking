import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <header className="body-font z-10">
        <div className="container mx-0 flex flex-wrap p-6 px-14 flex-col md:flex-row items-center backdrop-blur-3xl text-orange1 bg-blend-color relative z-20">
        <div className="mb-0 flex flex-row items-center gap-2">
          <img src="src\assets\logo.jpg" alt="Ettarra Logo" className="w-20 h-20" />
          <p className="text-3xl">Ettarra</p>
        </div>
          
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center navbar text-base">
            <Link to="/" className="mr-12 hover:text-orange6">
              Home
            </Link>
            <Link to="/menus" className="mr-12 hover:text-orange6">
              Menu
            </Link>
            <Link to="/events" className="mr-12 hover:text-orange6">
              Events
            </Link>
            <Link to="/chefs" className="mr-12 hover:text-orange6">
              Chefs
            </Link>
            <Link to="/chatbot" className="mr-12 hover:text-orange6">
              AI Assistance
            </Link>
            <Link to="/reviews" className="mr-12 hover:text-orange6">
              Reviews
            </Link>
    

            {/* Dropdown for Login/Register */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className={`mr-3 hover:bg-orange10 ml-2 bg-orange9 px-6 py-2 rounded-md focus:outline-none ${
                  isAuthenticated ? "" : "text-base"
                }`}
              >
                {isAuthenticated ? "Account" : "Login/Sign Up"}
              </button>
              {!isAuthenticated && isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-orange2 shadow-lg rounded-md z-30">
                  {" "}
                  {/* Higher z-index */}
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-orange12 text-center rounded-md hover:bg-orange4 border-b-2 border-orange5"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-orange12 text-center rounded-md hover:bg-orange4 border-b-2 border-orange5"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="mr-12 hover:text-orange6"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Nav;
