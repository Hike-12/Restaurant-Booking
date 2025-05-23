// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Nav from "./components/Nav";
import Home from "./components/Home";
import MenuList from "./components/MenuList";
import EventList from "./components/EventList";
import ChefList from "./components/ChefList";
import TableBookingList from "./components/TableBookingList";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import EventScheduleList from "./components/EventScheduleList";
import Booking from "./components/Booking";
import Reviews from "./components/Reviews";
import Chatbot from "./components/Chatbot";
import VRScene from "./components/VRScene";
import Footer from "./components/Footer";

// Wrap routes with AnimatePresence for smooth page transitions
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuList />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/event-schedules" element={<EventScheduleList />} />
        <Route path="/events/:eventId/book/:scheduleId" element={<Booking />} />
        <Route path="/chefs" element={<ChefList />} />
        <Route path="/table-bookings" element={<TableBookingList />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/tour" element={<VRScene />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-sand">
      <Router>
        <Nav />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
