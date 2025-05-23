import React, { useState, useEffect } from "react";
import { Calendar, Users, CheckCircle, AlertCircle, X, Clock } from "lucide-react";
import { motion } from "framer-motion";

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user-registered-events/",
          {
            method: "GET",
            credentials: "include", // Sends cookies for authenticated requests
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRegisteredEvents();
  }, []);

  const cancelEvent = async (eventId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/cancel-registration/${eventId}/`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Event canceled successfully");
        setEvents(events.filter((event) => event.id !== eventId));
      } else {
        alert("Error canceling event");
      }
    } catch (err) {
      alert("An error occurred while canceling");
    }
  };

  const getQueuePosition = async (eventId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/queue-position/${eventId}/`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching queue position");
      }

      const data = await response.json();
      const pos = data.position_in_queue + 1; // Adjusting queue position for display
      alert(`Queue position: ${pos}`);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <motion.div
      className="w-full px-0 py-12 bg-sand"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl text-center font-bold mb-8 text-olive">
          Your Registered Events
        </h2>
        <ul className="grid pt-4 px-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.length > 0 ? (
            events.map((event, index) => (
              <motion.li
                key={index}
                className="bg-beige rounded-3xl shadow-xl border-2 border-olive p-7 flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <h3 className="text-2xl font-bold mb-3 text-black">
                  {event.event_type}
                </h3>
                <div className="space-y-2 text-base mb-4">
                  <p className="flex items-center text-olive">
                    <Calendar size={18} className="mr-2" />
                    {new Date(event.event_date).toLocaleString()}
                  </p>
                  <p className="flex items-center text-olive">
                    <Users size={18} className="mr-2" />
                    <span className="text-black">{event.bookings_left}</span> /{" "}
                    <span className="text-black">{event.bookings_available}</span>{" "}
                    spots left
                  </p>
                  {event.is_in_queue ? (
                    <p className="flex items-center text-yellow-700">
                      <AlertCircle size={18} className="mr-2" />
                      You are on the waitlist
                    </p>
                  ) : (
                    <p className="flex items-center text-green-700">
                      <CheckCircle size={18} className="mr-2" />
                      You are confirmed
                    </p>
                  )}
                </div>
                <div className="mt-4 space-y-2">
                  {event.is_in_queue && (
                    <button
                      onClick={() => getQueuePosition(event.id)}
                      className="w-full px-4 py-2 bg-olive text-sand rounded-lg flex items-center justify-center hover:bg-black hover:text-beige transition-colors duration-300"
                    >
                      <Clock size={18} className="mr-2" />
                      Check Queue Position
                    </button>
                  )}
                  <button
                    onClick={() => cancelEvent(event.id)}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
                  >
                    <X size={18} className="mr-2" />
                    Cancel Registration
                  </button>
                </div>
              </motion.li>
            ))
          ) : (
            <p className="text-olive col-span-full">
              You haven't registered for any events yet.
            </p>
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default UserEvents;
