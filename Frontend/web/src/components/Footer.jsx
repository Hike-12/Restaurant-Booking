import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-beige text-black p-10 border-t-4 border-olive"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-start gap-8">
        <div className="mb-6 flex flex-col items-start">
          <img
            src="/logo.png"
            alt="The Coffee Cup Logo"
            className="w-20 h-20 rounded-full border-2 border-olive shadow"
          />
          <h2 className="text-2xl font-bold mt-3 text-olive">
            The Coffee Cup
          </h2>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-4 text-olive">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-olive transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-olive transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-olive transition-colors"
              >
                The Coffee Cup Insists
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-olive transition-colors"
              >
                Brew Stories
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-olive transition-colors"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-4 text-olive">Address</h3>
          <a
            href="https://www.google.com/maps/place/Juhu+Residency+Boutique+Hotel,+Mumbai,+Maharashtra+400049"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-olive transition-colors"
          >
            Juhu Residency Boutique Hotel, Mumbai,<br /> Maharashtra 400049
          </a>
          <p className="flex items-center mt-2 text-olive">
            <span role="img" aria-label="Location pin" className="mr-2">
              📍
            </span>
            Juhu, Mumbai
          </p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-4 text-olive">Contact</h3>
          <p className="flex items-center">
            <span role="img" aria-label="Phone" className="mr-2">
              📞
            </span>
            +91 98256 03145
          </p>
          <p className="flex items-center mt-2">
            <span role="img" aria-label="Email" className="mr-2">
              ✉️
            </span>
            care@coffeecup.in
          </p>
        </div>
        <div className="mb-6 flex flex-col items-start">
          <a
            href="#"
            className="bg-olive text-sand py-2 px-5 rounded-lg mb-2 text-center font-semibold shadow hover:bg-black hover:text-beige transition-colors"
          >
            Order On Zomato
          </a>
          <a
            href="#"
            className="bg-olive text-sand py-2 px-5 rounded-lg text-center font-semibold shadow hover:bg-black hover:text-beige transition-colors"
          >
            Order On Swiggy
          </a>
          <div className="mt-4 text-center">
            <p className="text-olive">Open For Dine-In</p>
            <p className="text-2xl font-bold text-black">24/7</p>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="#"
            className="hover:text-olive transition-colors"
          >
            <i className="fab fa-facebook text-xl"></i>
          </a>
          <a
            href="#"
            className="hover:text-olive transition-colors"
          >
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a
            href="#"
            className="hover:text-olive transition-colors"
          >
            <i className="fab fa-spotify text-xl"></i>
          </a>
        </div>
        <p className="mt-2 text-black">
          © The Coffee Cup 2024. Webworks by Infobahn
        </p>
        <p className="text-sm text-olive">
          Registered name: Bunts Hotels Private Limited
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;