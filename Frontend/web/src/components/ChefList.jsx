import React, { useEffect, useState } from "react";
import ChefCard from "./ChefCard";

const ChefList = () => {
  const [chefs, setChefs] = useState([]);

  const fetchChefs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/chefs/"); // Full localhost URL
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
    <>
      <div className="flex justify-center items-center flex-col bg-gradient-to-b from-amber-100 to-amber-300">
        <span className="text-3xl font-bold text-amber-900 py-6">Chefs</span>
        <ul className="grid mt-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 pb-6">
          {chefs.map((chef) => (
            <li key={chef.name}>
              <ChefCard chef={chef} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChefList;
