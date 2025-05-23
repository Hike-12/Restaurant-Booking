import React from "react";

const ChefCard = ({ chef }) => {
  return (
    <div className="max-w-sm border border-orange7 rounded-lg shadow dark:bg-gray-800 dark:border-orange8">
      <div className="h-1/2">
        <img
          className="rounded-t-lg w-full h-1/2 object-cover"
          src={`http://127.0.0.1:8000${chef.img}`}
          alt={chef.name}
        />
      </div>
      <div className="p-5 bg-orange9 rounded-b-lg">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-white">
            {chef.name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-white dark:text-white">
          Cuisine: {chef.cuisine}
        </p>
        <p className="mb-3 font-normal text-white dark:text-white">
          Availability: {chef.availability}
        </p>
      </div>
    </div>
  );
};

export default ChefCard;
