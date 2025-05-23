import React, { useEffect, useState } from "react";
import AddReview from "./AddReview";
import Nav from "./Nav";
import { Star, Calendar } from "lucide-react";

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
    <div className="flex flex-col px-10 py-8 bg-gradient-to-b from-amber-100 to-amber-300">
      <h2 className="text-3xl font-bold mt-2 text-center text-amber-900">
        Customer Reviews
      </h2>
      <div className="my-12">
        <AddReview />
      </div>
      <div className="my-10">
        <hr className="border-amber-800"></hr>
        <br />
        <h2 className="text-center font-bold text-3xl text-amber-900">
          Reviews from our customers
        </h2>
      </div>
      {reviews.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <li
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <strong className="text-lg text-gray-800">{review.user}</strong>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  <span className="text-gray-600">{review.rating}/5</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{review.comment}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <small>{new Date(review.created_at).toLocaleString()}</small>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;
