import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, Clock, Users, CalendarCheck, AlertCircle, Loader } from "lucide-react";
import UserEvents from "./UserEvents";
import { motion } from "framer-motion";
import { VITE_API_BASE_URL } from "../config/api";

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
  const [isLoading, setIsLoading] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const eventId = query.get("eventId");

  // Fetch schedules based on eventId
  const fetchSchedules = async () => {
    if (eventId) {
      try {
        const response = await fetch(
          `${VITE_API_BASE_URL}/event-schedules/?eventId=${eventId}`
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
    setIsLoading(true);
    try {
      const response = await fetch(
        `${VITE_API_BASE_URL}/event-schedules/${scheduleId}/register/`,
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [eventId]);

  return (
    <>
      <div className="p-10 min-h-screen flex flex-col items-center justify-center bg-sand">
        <motion.div
          className="max-w-6xl w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-4xl text-center font-extrabold text-darkBrown mb-10 tracking-tight flex items-center justify-center">
            <Calendar className="mr-3" size={32} />
            Event Schedule
          </h2>
          
          {registrationStatus && (
            <motion.div 
              className="mb-8 bg-beige p-4 rounded-xl border border-olive text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-center text-darkBrown flex items-center justify-center">
                <AlertCircle className="mr-2 text-darkBrown" size={18} />
                {registrationStatus}
              </p>
            </motion.div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {schedules.map((schedule, idx) => (
              <motion.div
                key={schedule.id}
                className="bg-beige rounded-3xl shadow-xl border-2 border-olive flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07, duration: 0.5, ease: "easeOut" }}
              >
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-2xl text-darkBrown mb-4">{schedule.event}</h3>
                  <div className="space-y-3 mb-6">
                    <p className="text-darkBrown flex items-center">
                      <Calendar className="mr-2 h-5 w-5" /> 
                      <span className="text-darkBrown">{schedule.date}</span>
                    </p>
                    <p className="text-darkBrown flex items-center">
                      <Clock className="mr-2 h-5 w-5" /> 
                      <span className="text-darkBrown">{schedule.time}</span>
                    </p>
                    <p className="text-darkBrown flex items-center">
                      <Users className="mr-2 h-5 w-5" /> 
                      <span className="text-darkBrown">
                        {schedule.bookings_available} spots available, {schedule.bookings_left} left
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => registerForEventSchedule(schedule.id)}
                    disabled={isLoading}
                    className="w-full bg-olive text-sand px-4 py-3 rounded-lg hover:bg-black hover:text-beige transition-colors font-semibold flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader size={18} className="mr-2 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <CalendarCheck size={18} className="mr-2" />
                        Register
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <UserEvents />
    </>
  );
};

export default EventScheduleList;
