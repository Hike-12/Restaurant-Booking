import React from "react";
import ChefCard from "./ChefCard";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import { VITE_API_BASE_URL } from "../config/api";

const ChefList = () => {
  const { data: chefs = [], isLoading, error } = useQuery({
    queryKey: ["chefs"],
    queryFn: async () => {
      const response = await fetch(`${VITE_API_BASE_URL}/chefs/`);
      if (!response.ok) {
        throw new Error("Failed to fetch chefs");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sand py-12 px-4 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-sand py-12 px-4 flex justify-center items-center">
        <div className="text-red-600 bg-red-100 p-4 rounded-lg">
          Error loading chefs: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand py-12 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-extrabold text-center text-darkBrown mb-10 tracking-tight">
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
