import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MenuList = () => {
  const [menus, setMenus] = useState([]);

  const fetchMenus = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/menus/");
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  useEffect(() => {
    fetchMenus();
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
          Our Menu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {menus.map((menu, idx) => (
            <motion.div
              key={menu.item}
              className="group bg-beige rounded-3xl shadow-xl border-2 border-olive flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07, duration: 0.5, ease: "easeOut" }}
            >
              <div className="relative">
                <img
                  src={`http://127.0.0.1:8000${menu.img}`}
                  alt={menu.item}
                  className="w-full h-56 object-cover rounded-t-3xl"
                />
                <div className="absolute top-4 right-4 bg-olive text-sand px-3 py-1 rounded-full text-xs font-semibold shadow">
                  Rs.{menu.cost}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-2xl text-black mb-2 group-hover:text-olive transition-colors">
                  {menu.item}
                </h3>
                <p className="text-olive font-semibold mb-2">
                  Calories:{" "}
                  <span className="text-black">{menu.calories} kcal</span>
                </p>
                <p className="text-black text-base mb-4 flex-1">
                  {menu.description}
                </p>
                <div className="flex justify-end">
                  <span className="inline-block bg-olive text-sand px-4 py-1 rounded-full text-xs font-medium shadow">
                    {menu.category || "Special"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MenuList;
