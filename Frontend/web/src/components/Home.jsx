import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UtensilsCrossed, Video } from "lucide-react";

const Home = () => {
  return (
    <section className="body-font min-h-screen w-full flex flex-col bg-sand bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
      <motion.div
        className="flex-grow flex flex-col items-center justify-center px-4 py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="bg-beige/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center max-w-3xl border-2 border-olive"
          whileHover={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <motion.h1
            className="mb-6 text-5xl font-extrabold leading-tight text-black tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Experience the Art of{" "}
            <span className="text-olive">Exclusive Dining</span>
          </motion.h1>
          <motion.p
            className="mb-8 text-xl font-normal text-olive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Join us for themed supper events where culinary art meets
            unforgettable moments.
            <br />
            Reserve your spot and enjoy a dining experience like no other.
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/table-bookings"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-sand bg-olive rounded-xl shadow hover:bg-black hover:text-beige transition-colors"
            >
              <UtensilsCrossed size={20} className="mr-2" />
              Reserve Your Experience
            </Link>
            <Link
              to="/tour"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-olive bg-sand border-2 border-olive rounded-xl shadow hover:bg-beige hover:text-black transition-colors"
            >
              <Video size={20} className="mr-2" />
              Virtual Tour
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
