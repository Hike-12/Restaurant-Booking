import React, { useEffect, useState } from "react";
import ChefCard from "./ChefCard";
import { motion } from "framer-motion";

const ChefList = () => {
  const [chefs, setChefs] = useState([]);

  const fetchChefs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/chefs/");
      const data = await response.json();
      setChefs(data);
    } catch (error) {
      console.error("Error fetching chefs:", error);
    }
  };

  useEffect(() => {
    fetchChefs();
  }, []);

  return (
    <div className="min-h-screen bg-sand py-12 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-extrabold text-center text-olive mb-10 tracking-tight">
          Meet Our Chefs
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {chefs.map((chef, idx) => (
            <motion.li
              key={chef.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.09, duration: 0.5, ease: "easeOut" }}
            >
              <ChefCard chef={chef} />
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default ChefList;
