import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { VITE_API_BASE_URL } from "../config/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password1: password,
          password2: password,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Registration successful! Please login to continue.");
        navigate("/login");
      } else {
        if (typeof data.errors === "string") {
          toast.error(data.errors);
        } else {
          Object.values(data.errors).forEach((error) => {
            toast.error(error);
          });
        }
        setError(data.errors);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      setError("Registration failed");
    }
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
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border border-olive rounded-lg w-full py-3 px-4 text-darkBrown leading-tight focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive bg-sand"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border border-olive rounded-lg w-full py-3 px-4 text-darkBrown mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive bg-sand"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-olive hover:bg-black text-sand font-bold py-3 px-4 rounded-lg w-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-olive"
              >
                Register
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
