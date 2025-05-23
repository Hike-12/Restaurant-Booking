import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Corrected Content-Type
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok && data.success) {
        // Store the session ID or token in localStorage
        localStorage.setItem("authToken", data.token); // Use 'authToken' or similar
        localStorage.setItem("username", data.username);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/"); // Redirect to home page or desired route
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 bg-[url('./assets/login_bg.jpg')] bg-cover bg-center filter blur-sm"></div>

        {/* Content Container */}
        <div className="relative bg-orange2 shadow-lg rounded-lg p-10 max-w-sm w-full backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-6 text-center text-orange12">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-orange8 focus:border-orange8"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-orange8 focus:border-orange8"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-orange9 hover:bg-orange10 text-white font-bold py-3 px-4 rounded-lg w-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange8 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
