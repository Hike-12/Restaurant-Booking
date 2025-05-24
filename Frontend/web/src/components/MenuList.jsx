import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Coffee, DollarSign, Flame, UtensilsCrossed } from "lucide-react";
import { Spinner } from "./Spinner";
import OptimizedImage from "./OptimizedImage";
import { preloadImages } from "../hooks/useImageCache";
import { VITE_API_BASE_URL } from "../config/api";

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${VITE_API_BASE_URL}/menus/`);
        if (!response.ok) {
          throw new Error("Failed to fetch menus");
        }
        const data = await response.json();
        setMenus(data);

        // Preload all menu images
        const imageUrls = data.map((menu) => `http://127.0.0.1:8000${menu.img}`);
        preloadImages(imageUrls);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenus();
  }, []);

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
          Error loading menu: {error}
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
        <h2 className="text-4xl font-extrabold text-center text-darkBrown mb-10 tracking-tight flex items-center justify-center">
          <Coffee size={32} className="mr-3" />
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
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <OptimizedImage
                  src={menu.img}
                  alt={menu.item}
                  className="w-full h-56 object-cover rounded-t-3xl"
                  height="224px"
                />
                <div className="absolute top-4 right-4 bg-olive text-sand px-3 py-1 rounded-full text-xs font-semibold shadow flex items-center">
                  <DollarSign size={14} className="mr-1" />
                  Rs.{menu.cost}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-2xl text-darkBrown mb-3 group-hover:text-darkBrown transition-colors">
                  {menu.item}
                </h3>
                <p className="text-darkBrown font-semibold mb-2 flex items-center">
                  <Flame size={16} className="mr-2" />
                  Calories:{" "}
                  <span className="text-darkBrown ml-1">{menu.calories} kcal</span>
                </p>
                <p className="text-darkBrown text-base mb-4 flex-1">
                  {menu.description}
                </p>
                <div className="flex justify-end">
                  <span className="inline-block bg-olive text-sand px-4 py-1 rounded-full text-xs font-medium shadow flex items-center">
                    <UtensilsCrossed size={14} className="mr-1" />
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
