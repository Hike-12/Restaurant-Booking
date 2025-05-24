import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, QrCode, ArrowRight } from "lucide-react";
import { Spinner } from "./Spinner";
import OptimizedImage from "./OptimizedImage";
import { preloadImages } from "../hooks/useImageCache";
import { VITE_API_BASE_URL } from "../config/api";

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${VITE_API_BASE_URL}/events/`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);

        // Preload all event images to speed up rendering
        const imageUrls = data.flatMap((event) => [
          `${VITE_API_BASE_URL.replace('/api', '')}${event.img}`,
          `${VITE_API_BASE_URL.replace('/api', '')}${event.qr_code}`,
        ]);
        preloadImages(imageUrls);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/event-schedules?eventId=${eventId}`);
  };

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
          Error loading events: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand py-12 px-4 flex flex-col items-center">
      <motion.div
        className="max-w-6xl w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-extrabold text-center text-darkBrown mb-10 tracking-tight">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              className="bg-beige rounded-3xl shadow-xl border-2 border-olive flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07, duration: 0.5, ease: "easeOut" }}
            >
              <div className="relative h-56">
                <OptimizedImage
                  src={event.img}
                  alt={event.type}
                  className="w-full h-56 object-cover rounded-t-3xl"
                  height="224px"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-2xl text-darkBrown mb-2">
                  {event.type}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-darkBrown font-semibold flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Available:{" "}
                    <span className="text-darkBrown ml-1">
                      {event.bookings_available}
                    </span>
                  </p>
                  <p className="text-darkBrown font-semibold flex items-center">
                    <Users size={16} className="mr-1" />
                    Left:{" "}
                    <span className="text-darkBrown ml-1">{event.bookings_left}</span>
                  </p>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <QrCode size={18} className="absolute top-0 left-0 text-darkBrown m-2" />
                    <OptimizedImage
                      src={event.qr_code}
                      alt={`QR Code for ${event.type}`}
                      className="w-28 h-28 object-cover border-2 border-olive rounded-xl"
                      width="112px"
                      height="112px"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleEventClick(event.id)}
                  className="mt-2 w-full bg-olive text-sand px-4 py-2 rounded-lg hover:bg-black hover:text-beige transition-colors flex items-center justify-center font-semibold"
                >
                  See More
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EventList;
