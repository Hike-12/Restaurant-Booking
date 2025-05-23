import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

const TableBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [selectedTables, setSelectedTables] = useState([]);

  // Generate 45-minute interval time options
  const generateTimeOptions = () => {
    const timeOptions = [];
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0);
    for (let i = 0; i < 24 * 60; i += 45) {
      const timeString = startTime.toTimeString().split(" ")[0].slice(0, 5);
      timeOptions.push(timeString);
      startTime.setMinutes(startTime.getMinutes() + 45);
    }
    return timeOptions;
  };

  const timeOptions = generateTimeOptions();

  const fetchBookings = async () => {
    if (!bookingDate || !bookingTime) return;

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/table-bookings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCsrfToken(), // CSRF token included
          },
          body: JSON.stringify({
            date: bookingDate,
            time: bookingTime,
          }),
          credentials: "include", // Ensures the session cookie is sent
        }
      );

      const data = await response.json();
      setBookings(data);
      setSelectedTables([]);
    } catch (error) {
      console.error("Error fetching table bookings:", error);
    }
  };

  useEffect(() => {
    if (bookingDate && bookingTime) {
      fetchBookings();
    }
  }, [bookingDate, bookingTime]);

  const getCsrfToken = () => {
    const name = "csrftoken";
    const value = document.cookie;
    const parts = value.split("; ").find((part) => part.startsWith(name));
    return parts ? parts.split("=")[1] : null;
  };

  const handleTableClick = (tableId) => {
    const table = bookings.find((booking) => booking.table_id === tableId);
    if (table && !table.status) {
      setSelectedTables((prev) =>
        prev.includes(tableId)
          ? prev.filter((id) => id !== tableId)
          : [...prev, tableId]
      );
    }
  };

  const handleBooking = async () => {
    if (!bookingDate || !bookingTime || selectedTables.length === 0) {
      alert("Please select a date, time, and at least one table.");
      return;
    }

    const authToken = localStorage.getItem("sessionid");

    if (!authToken) {
      alert("You need to log in to book a table.");
      return;
    }

    const timing = `${bookingDate} ${bookingTime}:00`;

    try {
      const bookingPromises = selectedTables.map((tableId) =>
        fetch("http://127.0.0.1:8000/api/book-table/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCsrfToken(),
            Authorization: `Bearer ${authToken}`, // Pass the token here
          },
          body: JSON.stringify({ table_id: tableId, timing }),
          credentials: "include", // Ensures session is sent with request
        })
      );

      const responses = await Promise.all(bookingPromises);
      const results = await Promise.all(responses.map((res) => res.json()));

      const successfulBookings = results.filter((result) => !result.success);
      const failedBookings = results.filter((result) => result.success);

      if (successfulBookings.length > 0) {
        alert(`Successfully booked ${successfulBookings.length} table(s)!`);
      }

      if (failedBookings.length > 0) {
        alert(
          `Failed to book ${failedBookings.length} table(s). Please try again.`
        );
      }

      fetchBookings();
    } catch (error) {
      console.error("Error booking tables:", error);
      alert("An error occurred while booking the tables. Please try again.");
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-sand p-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="w-full max-w-3xl bg-beige rounded-3xl shadow-xl border-2 border-olive overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-darkBrown">
            Table Booking
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-base font-medium mb-1 text-darkBrown">
                Date:
              </label>
              <div className="relative">
                <Calendar className="absolute top-2.5 left-2 text-darkBrown w-4 h-4" />
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="pl-8 p-2 text-sm border border-olive rounded w-full bg-sand text-darkBrown focus:outline-none focus:ring-2 focus:ring-olive"
                />
              </div>
            </div>
            <div>
              <label className="block text-base font-medium mb-1 text-darkBrown">
                Time:
              </label>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="p-2 text-sm border border-olive rounded w-full bg-sand text-darkBrown focus:outline-none focus:ring-2 focus:ring-olive"
              >
                <option value="">Select</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative bg-beige w-full h-96 border-2 border-olive rounded-lg overflow-scroll">
            <div className="grid grid-cols-5 gap-2 mt-16 mx-2 pt-4 px-3">
              {bookings.map((booking) => (
                <div
                  key={booking.table_id}
                  onClick={() => handleTableClick(booking.table_id)}
                  className={`w-20 h-20 rounded-lg flex items-center mb-2 justify-center cursor-pointer transition-colors duration-200 ${
                    booking.status
                      ? "bg-red-500"
                      : selectedTables.includes(booking.table_id)
                      ? "bg-green-500"
                      : "bg-sand hover:bg-olive hover:text-sand"
                  }`}
                >
                  <span
                    className={`font-bold ${
                      booking.status || selectedTables.includes(booking.table_id)
                        ? "text-sand"
                        : "text-black"
                    }`}
                  >
                    {booking.table_id}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-sand border border-olive rounded-full mr-2"></div>
                <span className="text-sm text-black">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-black">Booked</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-black">Selected</span>
              </div>
            </div>
            <button
              onClick={handleBooking}
              className="bg-olive text-sand px-4 py-2 rounded text-sm font-medium hover:bg-black hover:text-beige disabled:bg-gray-400 transition-colors"
              disabled={
                selectedTables.length === 0 || !bookingDate || !bookingTime
              }
            >
              Book Selected ({selectedTables.length})
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-base text-black">
            <span className="font-bold">Note: </span>To Cancel Booking Please
            Call On +91 98256 03145
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TableBookingList;
