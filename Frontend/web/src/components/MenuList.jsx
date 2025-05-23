import React, { useEffect, useState } from "react";

const MenuList = () => {
  const [menus, setMenus] = useState([]);

  const fetchMenus = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/menus/"); // Full localhost URL
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
    <>
      <div className="p-10 bg-gradient-to-b from-amber-100 to-amber-300">
        <div className="pb-6">
          <h2 className="text-3xl text-center font-bold text-amber-900 mb-2">
            Our Menu
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <div
              key={menu.item}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={`http://127.0.0.1:8000${menu.img}`}
                alt={menu.item}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-amber-900 text-lg mb-2">
                  {menu.item}
                </h3>
                <p className="text-amber-700 font-bold mb-2">
                  Price: Rs.{menu.cost}
                </p>
                <p className="text-amber-700 font-bold mb-2">
                  Calories: {menu.calories} kcal
                </p>
                <p className="text-amber-600 text-sm">{menu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuList;
