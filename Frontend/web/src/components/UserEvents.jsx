import React, { useState, useEffect } from "react";
import { Calendar, Users, CheckCircle, AlertCircle, X,Clock } from "lucide-react";

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
    <>
      <hr className="border-amber-800"></hr>
      <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-amber-300 to-amber-100">
        <h2 className="text-2xl text-center font-bold mb-4 text-amber-900">
          Your Registered Events
        </h2>
        <ul className="grid pt-10 px-10 grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event, index) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-3">
                    {event.event_type}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      {new Date(event.event_date).toLocaleString()}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <Users size={16} className="mr-2" />
                      {event.bookings_left} / {event.bookings_available} spots
                      left
                    </p>
                    {event.is_in_queue ? (
                      <p className="flex items-center text-amber-600">
                        <AlertCircle size={16} className="mr-2" />
                        You are on the waitlist
                      </p>
                    ) : (
                      <p className="flex items-center text-green-600">
                        <CheckCircle size={16} className="mr-2" />
                        You are confirmed
                      </p>
                    )}
                  </div>
                  <div className="mt-4 space-y-2">
                    {event.is_in_queue && (
                      <button
                        onClick={() => getQueuePosition(event.id)}
                        className="w-full px-4 py-2 bg-amber-500 text-white rounded flex items-center justify-center hover:bg-amber-600 transition-colors duration-300"
                      >
                        <Clock size={16} className="mr-2" />
                        Check Queue Position
                      </button>
                    )}
                    <button
                      onClick={() => cancelEvent(event.id)}
                      className="w-full px-4 py-2 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                    >
                      <X size={16} className="mr-2" />
                      Cancel Registration
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-600 col-span-full">
              You haven't registered for any events yet.
            </p>
          )}
        </ul>
      </div>
    </>
  );
};

export default UserEvents;
