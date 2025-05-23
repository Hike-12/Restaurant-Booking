import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-50 text-brown-900 p-8">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-start">
        <div className="mb-6">
          <img src="src\assets\logo.jpg" alt="Ettarra Logo" className="w-32" />
          <h2 className="text-2xl font-semibold mt-2">Ettarra Coffee House</h2>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Ettarra Insists
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Brew Stories
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-4">Address</h3>
          <a 
      href="https://www.google.com/maps/place/Juhu+Residency+Boutique+Hotel,+Mumbai,+Maharashtra+400049" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="hover:underline"
    >
      Juhu Residency Boutique Hotel, Mumbai,<br /> Maharashtra 400049
    </a>
          <p className="flex items-center mt-2">
            <span role="img" aria-label="Location pin" className="mr-2">
              📍
            </span>
            Juhu, Mumbai
          </p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-4">Contact</h3>
          <p className="flex items-center">
            <span role="img" aria-label="Phone" className="mr-2">
              📞
            </span>{" "}
            +91 98256 03145
          </p>
          <p className="flex items-center mt-2">
            <span role="img" aria-label="Email" className="mr-2">
              ✉️
            </span>{" "}
            care@ettarracoffee.in
          </p>
        </div>
        <div className="mb-6 flex flex-col">
          <a
            href="#"
            className="bg-brown-800 text-white py-2 px-4 rounded mb-2 text-center"
          >
            Order On Zomato
          </a>
          <a
            href="#"
            className="bg-brown-800 text-white py-2 px-4 rounded text-center"
          >
            Order On Swiggy
          </a>
          <div className="mt-4 text-center">
            <p>Open For Dine-In</p>
            <p className="text-2xl font-bold">24/7</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <div className="flex justify-center space-x-4">
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-spotify"></i>
          </a>
        </div>
        <p className="mt-4">
          © Ettarra Coffee House 2024. Webworks by Infobahn
        </p>
        <p className="text-sm">Registered name: Bunts Hotels Private Limited</p>
      </div>
    </footer>
  );
};

export default Footer;