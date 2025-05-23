import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, Clock, Users } from "lucide-react";
import UserEvents from "./UserEvents";

// Helper function to get CSRF token
const getCsrfToken = () => {
  const name = "csrftoken";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const EventScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const query = new URLSearchParams(useLocation().search);
  const eventId = query.get("eventId");

  // Fetch schedules based on eventId
  const fetchSchedules = async () => {
    if (eventId) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/event-schedules/?eventId=${eventId}`
        );
        const data = await response.json();
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching event schedules:", error);
      }
    }
  };

  // Register for an event schedule
  const registerForEventSchedule = async (scheduleId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/event-schedules/${scheduleId}/register/`,
        {
          method: "POST",
          credentials: "include", // Include session cookies
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCsrfToken(), // Include the CSRF token
          },
        }
      );

      const data = await response.json();
      if (response.status === 201) {
        setRegistrationStatus(data.message); // Registration successful
      } else {
        setRegistrationStatus(data.error || data.message); // Display error message
      }
    } catch (error) {
      console.error("Error registering for event schedule:", error);
      setRegistrationStatus("An error occurred during registration.");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [eventId]);

  return (
    <>
      <div className="p-10 bg-gradient-to-b from-amber-100 to-amber-300 min-h-screen flex flex-col items-center justify-center">
        <div className="pb-10">
          <h2 className="text-3xl text-center font-bold text-amber-900 mb-2">
            Event Schedule
          </h2>
          {registrationStatus && (
            <p className="text-center text-amber-700 mt-2">
              {registrationStatus}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <h3 className="font-semibold text-amber-900 text-lg mb-2">
                  {schedule.event}
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-amber-700 flex items-center">
                    <Calendar className="mr-2 h-4 w-4" /> {schedule.date}
                  </p>
                  <p className="text-amber-700 flex items-center">
                    <Clock className="mr-2 h-4 w-4" /> {schedule.time}
                  </p>
                  <p className="text-amber-700 flex items-center">
                    <Users className="mr-2 h-4 w-4" /> Available:{" "}
                    {schedule.bookings_available}, Left:{" "}
                    {schedule.bookings_left}
                  </p>
                </div>
                <button
                  onClick={() => registerForEventSchedule(schedule.id)}
                  className="w-full bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <UserEvents />
    </>
  );
};

export default EventScheduleList;
