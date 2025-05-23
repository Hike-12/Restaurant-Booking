import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="body-font mx-10 text-orange1 bg-[url('./assets/hero_bg.jpg')] bg-cover bg-center h-screen w-full flex flex-col ml-0">
        <Nav />
        <div className="container flex-grow flex justify-center items-center px-10 py-24 md:flex-col flex-col backdrop-blur-sm w-full">
        <div className="bg-black/40 backdrop-blur-md p-6 rounded-lg brightness-100 text-center my-5 max-w-7xl">
  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-orange1 md:text-5xl lg:text-6xl dark:text-orange2">
    Experience the Art of Exclusive Dining
  </h1>
  <br></br>
  <p className="mb-6 text-lg font-normal text-orange1 lg:text-xl sm:px-16 xl:px-48 dark:text-orange2 text-center">
    Join us for themed supper events where culinary art meets
    unforgettable moments. Reserve your spot and enjoy a dining
    experience like no other.
  </p>
</div>
          <Link
            to="/table-bookings"
            className="inline-flex items-center justify-center p-5 px-7 text-xl font-medium text-center text-orange2 bg-orange10 rounded-lg hover:bg-orange9 focus:ring-4 focus:ring-orange7 dark:focus:orange8"
          >
            Reserve Your Experience
          </Link>
          <Link
            to="/tour"
            className="m-7 inline-flex items-center justify-center p-5 px-7 text-xl font-medium text-center text-orange2 bg-orange10 rounded-lg hover:bg-orange9 focus:ring-4 focus:ring-orange7 dark:focus:orange8"
          >
            Virtual Tour
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
