import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/events/");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEventClick = (eventId) => {
    // Make sure to pass eventId as a primitive value
    navigate(`/event-schedules?eventId=${eventId}`);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-10 bg-gradient-to-b from-amber-100 to-amber-300 min-h-screen flex justify-center items-center flex-col">
      <div className="pb-10">
        <h2 className="text-3xl text-center font-bold text-amber-900 mb-2">
          Upcoming Events
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={`http://127.0.0.1:8000${event.img}`}
              alt={event.type}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="font-semibold text-amber-900 text-lg mb-2">
                {event.type}
              </h3>
              <div className="flex justify-between items-center mb-2">
                <p className="text-amber-700">
                  Available: {event.bookings_available}
                </p>
                <p className="text-amber-600">Left: {event.bookings_left}</p>
              </div>
              {/* Display the QR Code */}
              <div className="flex justify-center mb-4">
                <img
                  src={`http://127.0.0.1:8000${event.qr_code}`}
                  alt={`QR Code for ${event.type}`}
                  className="w-32 h-32 object-cover"
                />
              </div>
              <button
                onClick={() => handleEventClick(event.id)}
                className="mt-2 w-full bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors flex items-center justify-center"
              >
                See More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
