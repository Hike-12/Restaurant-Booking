import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingForm = () => {
    const { scheduleId } = useParams();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleBooking = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/book-table/${scheduleId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                alert('Booking successful!');
                navigate('/events');
            } else {
                setError(data.message || 'Booking failed.');
            }
        } catch (error) {
            console.error('Error during booking:', error);
            setError('Network error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-sand p-8 rounded-2xl shadow-xl border-2 border-olive max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-olive">Book Seats</h2>
            <button
                onClick={handleBooking}
                disabled={isLoading}
                className="bg-olive text-sand px-6 py-2 rounded-lg font-semibold shadow hover:bg-black hover:text-beige transition-colors mb-4"
            >
                {isLoading ? 'Booking...' : 'Book Now'}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default BookingForm;
