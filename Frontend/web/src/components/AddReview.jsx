import React, { useState } from "react";
import { Star, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { VITE_API_BASE_URL } from "../config/api"; // Adjust the import based on your project structure

const AddReview = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.warn("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${VITE_API_BASE_URL}/add-review/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important: Include cookies for session authentication
        body: JSON.stringify({
          // Remove user_id from here
          rating: rating,
          comment: comment,
        }),
      });

      if (response.ok) {
        toast.success("Review added successfully!");
        setRating(5);
        setComment("");
      } else {
        const errorData = await response.json();
        toast.error("Error: " + (errorData.error || "Failed to add review"));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error occurred");
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
