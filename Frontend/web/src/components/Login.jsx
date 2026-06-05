import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { VITE_API_BASE_URL } from "../config/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const performLogin = async (loginUsername, loginPassword) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${VITE_API_BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("isAuthenticated", "true");
        toast.success("Login successful! Welcome back!");
        navigate("/");
      } else {
        toast.error(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await performLogin(username, password);
  };

  const handleTestCredentialsLogin = async () => {
    const testUsername = "Aliqyaan";
    const testPassword = "aliqyaan123";
    await performLogin(testUsername, testPassword);
  };

  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center bg-sand">
        {/* Background Image Container */}
        <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center filter blur-sm"></div>

        {/* Content Container */}
        <motion.div
          className="relative bg-beige/95 shadow-2xl rounded-2xl p-10 max-w-sm w-full border-2 border-olive"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-darkBrown">
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
                className="shadow appearance-none border border-olive rounded-lg w-full py-3 px-4 text-darkBrown leading-tight focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive bg-sand"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow appearance-none border border-olive rounded-lg w-full py-3 px-4 text-darkBrown mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive bg-sand"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-olive hover:bg-black text-sand font-bold py-3 px-4 rounded-lg w-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-olive ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <button
              type="button"
              onClick={handleTestCredentialsLogin}
              disabled={isLoading}
              aria-label="Login using predefined test account credentials"
              className={`ml-auto block bg-darkBrown hover:bg-black text-sand font-semibold py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-olive ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Login with test credentials
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
