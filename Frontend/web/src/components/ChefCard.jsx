import React, { useState } from "react";
import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

const ChefCard = ({ chef }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="bg-beige rounded-3xl shadow-xl border-2 border-olive flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative">
        <OptimizedImage
          src={chef.img}
          alt={chef.name}
          className="rounded-t-3xl w-full h-56 object-cover border-b-2 border-olive"
          height="224px"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-4 right-4 bg-olive text-sand px-3 py-1 rounded-full text-xs font-semibold shadow">
          {chef.cuisine}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black group-hover:text-olive transition-colors">
          {chef.name}
        </h5>
        <p className="mb-3 font-medium text-olive">
          <span className="font-semibold text-black">Specialty:</span> {chef.cuisine}
        </p>
        <p className="mb-3 font-medium text-olive">
          <span className="font-semibold text-black">Availability:</span> {chef.availability}
        </p>
        <div className="flex-1"></div>
        <div className="flex justify-end">
          <span className="inline-block bg-olive text-sand px-4 py-1 rounded-full text-xs font-medium shadow">
            Chef
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChefCard;
