import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        navigate("/login");
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return <div>Logging out...</div>;
};

export default Logout;
