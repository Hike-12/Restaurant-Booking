import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_API_BASE_URL } from "../config/api";

const Logout = () => {
  const navigate = useNavigate();

  // Function to get CSRF token from cookies
  const getCsrfToken = () => {
    const name = "csrftoken";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const performLogout = async () => {
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Logged out successfully!");
        navigate("/login");
      } else {
        toast.error("Logout failed: " + data.message);
      }
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    performLogout();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
