import React, { useState } from "react";
import { Star } from "lucide-react";

const AddReview = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      // Reset form or show success message
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Submit Your Review
      </h3>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="rating"
        >
          Rating:
        </label>
        <div className="flex items-center">
          <input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <Star className="w-5 h-5 text-yellow-500 ml-2" />
          <span className="text-gray-600 ml-1">/ 5</span>
        </div>
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="comment"
        >
          Comment:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          placeholder="Write your review here..."
        />
      </div>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default AddReview;
