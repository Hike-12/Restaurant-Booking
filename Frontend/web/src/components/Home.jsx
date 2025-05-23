import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <section className="body-font min-h-screen w-full flex flex-col bg-sand">
        <motion.div
          className="flex-grow flex flex-col items-center justify-center px-4 py-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-beige/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center max-w-3xl border-2 border-olive">
            <h1 className="mb-4 text-5xl font-extrabold leading-tight text-black tracking-tight">
              Experience the Art of{" "}
              <span className="text-olive">Exclusive Dining</span>
            </h1>
            <p className="mb-8 text-xl font-normal text-olive">
              Join us for themed supper events where culinary art meets
              unforgettable moments.
              <br />
              Reserve your spot and enjoy a dining experience like no other.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link
                to="/table-bookings"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-sand bg-olive rounded-xl shadow hover:bg-black hover:text-beige transition-colors"
              >
                Reserve Your Experience
              </Link>
              <Link
                to="/tour"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-olive bg-sand border-2 border-olive rounded-xl shadow hover:bg-beige hover:text-black transition-colors"
              >
                Virtual Tour
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
