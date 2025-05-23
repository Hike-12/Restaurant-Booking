import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "LogReglication/json",
        },
        body: JSON.stringify({
          username,
          password1: password, // Use password1 for the first password field
          password2: password, // Use password2 for confirmation
        }),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/login");
      } else {
        setError(data.errors); // This will contain the errors from the backend
      }
    } catch (error) {
      setError("Registration failed");
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
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-orange8 focus:border-orange8"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-orange8 focus:border-orange8"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-orange9 hover:bg-orange10 text-orange2 font-bold py-3 px-4 rounded-lg w-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ornage8"
              >
                Register
              </button>
            </div>
          </form>
          {error && (
            <div className="mt-4">
              {typeof error === "string" ? (
                <p className="text-red-500 text-xs italic">{error}</p>
              ) : (
                Object.entries(error).map(([key, value]) => (
                  <p key={key} className="text-red-500 text-xs italic">
                    {value}
                  </p>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
