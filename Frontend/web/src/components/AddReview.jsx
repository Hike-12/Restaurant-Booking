import React, { useState } from "react";
import { Star, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const AddReview = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const reviewData = {
      user_id: 1, // Replace with dynamic user ID in production
      rating,
      comment,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/add-review/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();
      console.log("Review added:", result);
      toast.success("Review submitted successfully!");
      setComment("");
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Error submitting review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-beige p-8 rounded-2xl shadow-xl border-2 border-olive relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-darkBrown flex items-center">
        <Star className="mr-2 text-yellow-500" size={24} />
        Submit Your Review
      </h3>

      <div className="mb-5">
        <label
          className="block text-black text-sm font-bold mb-3"
          htmlFor="rating"
        >
          Rating:
        </label>
        <div className="flex items-center bg-sand p-3 rounded-lg border border-olive">
          <input
            id="rating"
            type="range"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="flex-grow mr-3 accent-olive"
          />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-gray-300"
                }
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>
          <span className="text-darkBrown ml-2 font-semibold">
            {rating}/5
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold mb-3"
          htmlFor="comment"
        >
          Comment:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="shadow appearance-none border border-olive rounded-lg w-full py-3 px-4 text-black leading-relaxed focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive bg-sand h-32 resize-none"
          placeholder="Share your experience with us..."
        />
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-olive hover:bg-black text-sand font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive transition-colors duration-300 flex items-center"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Submit Review
              <Send size={16} className="ml-2" />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
};

export default AddReview;
