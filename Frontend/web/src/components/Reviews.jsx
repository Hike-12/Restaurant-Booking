import React, { useEffect, useState } from "react";
import AddReview from "./AddReview";
import { Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/reviews/");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col px-4 py-12 min-h-screen bg-sand">
      <motion.div
        className="max-w-5xl mx-auto w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-extrabold mt-2 text-center text-olive mb-10 tracking-tight">
          Customer Reviews
        </h2>
        <div className="my-8">
          <AddReview />
        </div>
        <div className="my-10">
          <hr className="border-olive" />
          <br />
          <h2 className="text-center font-bold text-3xl text-olive">
            Reviews from our customers
          </h2>
        </div>
        {reviews.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {reviews.map((review, idx) => (
              <motion.li
                key={idx}
                className="bg-beige rounded-3xl shadow-xl border-2 border-olive p-7 flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07, duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <strong className="text-lg text-black">{review.user}</strong>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="text-olive font-semibold">
                      {review.rating}/5
                    </span>
                  </div>
                </div>
                <p className="text-black mb-4 flex-1">{review.comment}</p>
                <div className="flex items-center text-sm text-olive">
                  <Calendar className="w-4 h-4 mr-2" />
                  <small>{new Date(review.created_at).toLocaleString()}</small>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-olive">No reviews yet.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Reviews;
