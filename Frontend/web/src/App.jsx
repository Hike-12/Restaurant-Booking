// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home"; // Create this component
import MenuList from "./components/MenuList"; // Your menu component
import EventList from "./components/EventList"; // Your event component
import ChefList from "./components/ChefList"; // Your chef component
import TableBookingList from "./components/TableBookingList"; // Your table booking component
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import EventScheduleList from "./components/EventScheduleList";
import Booking from "./components/Booking";
import Reviews from "./components/Reviews";
import Chatbot from "./components/Chatbot";
import VRScene from "./components/VRScene";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* <Logout /> */}
      <Router>
        <div>
          {/* <Nav /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menus" element={<MenuList />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/event-schedules" element={<EventScheduleList />} />
            <Route
              path="/events/:eventId/book/:scheduleId"
              element={<Booking />}
            />
            <Route path="/chefs" element={<ChefList />} />
            <Route path="/table-bookings" element={<TableBookingList />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/tour" element={<VRScene />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
      <hr></hr>
      <Footer />
    </>
  );
}

export default App;
