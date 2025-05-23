import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";

function Nav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
    // Check authentication
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, [location]);

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

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-3 bg-beige/95 shadow-lg backdrop-blur-sm rounded-b-2xl border-b-2 border-olive">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="The Coffee Cup Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-olive shadow-md"
            />
            <span className="text-xl sm:text-3xl font-bold text-olive tracking-wide">
              The Coffee Cup
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {["Home", "Menu", "Events", "Chefs", "Reviews"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`px-3 py-2 rounded-lg text-black hover:bg-olive/10 transition-colors ${
                  location.pathname === (item === "Home" ? "/" : `/${item.toLowerCase()}`)
                    ? "font-semibold text-olive bg-olive/10"
                    : ""
                }`}
              >
                {item}
              </Link>
            ))}
            <Link
              to="/chatbot"
              className={`px-3 py-2 rounded-lg text-black hover:bg-olive/10 transition-colors ${
                location.pathname === "/chatbot" ? "font-semibold text-olive bg-olive/10" : ""
              }`}
            >
              AI Assistance
            </Link>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 bg-olive hover:bg-black text-sand rounded-lg flex items-center gap-2 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="ml-2 px-4 py-2 bg-olive hover:bg-black text-sand rounded-lg flex items-center gap-2 transition-colors"
                >
                  <User size={18} />
                  <span>Account</span>
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-beige rounded-lg shadow-xl border border-olive overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to="/login"
                        className="block w-full text-left px-4 py-3 text-black hover:bg-sand border-b border-olive transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block w-full text-left px-4 py-3 text-black hover:bg-sand transition-colors"
                      >
                        Register
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-olive hover:bg-olive/10 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="md:hidden mt-4 rounded-lg border border-olive overflow-hidden bg-beige/95"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {["Home", "Menu", "Events", "Chefs", "Reviews", "AI Assistance"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home"
                    ? "/"
                    : item === "AI Assistance"
                      ? "/chatbot"
                      : `/${item.toLowerCase()}`
                  }
                  className="block py-3 px-4 text-black hover:bg-olive/10 border-b border-olive/30 transition-colors"
                >
                  {item}
                </Link>
              ))}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-3 px-4 text-olive hover:bg-olive/10 transition-colors flex items-center gap-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-3 px-4 text-black hover:bg-olive/10 border-b border-olive/30 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block py-3 px-4 text-black hover:bg-olive/10 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Nav;
