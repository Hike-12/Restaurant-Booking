import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
        navigate("/login");
      } else {
        setError(data.errors);
      }
    } catch (error) {
      setError("Registration failed");
    }
  };

  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center bg-sand">
        {/* Background Image Container */}
        <div className="absolute inset-0 bg-[url('./assets/login_bg.jpg')] bg-cover bg-center filter blur-sm opacity-30"></div>

        {/* Content Container */}
        <motion.div
          className="relative bg-beige/95 shadow-2xl rounded-2xl p-10 max-w-sm w-full border-2 border-olive"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-olive">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border border-olive rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive bg-sand"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border border-olive rounded-lg w-full py-3 px-4 text-black mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive bg-sand"
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
        </motion.div>
      </div>
    </>
  );
};

export default Register;
