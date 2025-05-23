import React from "react";
import { motion } from "framer-motion";

const events = [
  {
    title: "Coffee Tasting Night",
    date: "2024-07-10",
    description: "Experience a curated selection of our finest brews with expert guidance.",
    image: "src/assets/event1.jpg",
  },
  {
    title: "Live Jazz Evening",
    date: "2024-07-15",
    description: "Enjoy live jazz performances with a special menu and cozy ambiance.",
    image: "src/assets/event2.jpg",
  },
  {
    title: "Barista Workshop",
    date: "2024-07-20",
    description: "Learn the art of coffee making from our master baristas.",
    image: "src/assets/event3.jpg",
  },
];

const Events = () => {
  return (
    <div className="min-h-screen bg-sand py-12 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-extrabold text-center text-darkBrown mb-10 tracking-tight">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event, idx) => (
            <motion.div
              key={event.title}
              className="bg-beige rounded-3xl shadow-xl border-2 border-olive flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07, duration: 0.5, ease: "easeOut" }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-56 object-cover rounded-t-3xl"
              />
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-2xl text-darkBrown mb-2">{event.title}</h3>
                <p className="text-darkBrown font-semibold mb-2">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-darkBrown text-base mb-4 flex-1">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Events;
