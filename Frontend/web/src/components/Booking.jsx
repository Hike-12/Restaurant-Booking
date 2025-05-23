import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingForm = () => {
    const { scheduleId } = useParams(); // Get scheduleId from URL parameters
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
                credentials: 'include', // Include cookies for session
            });

            const data = await response.json();
            if (response.ok) {
                alert('Booking successful!');
                navigate('/events'); // Redirect to events page
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
        <div>
            <h2>Book Seats</h2>
            <button onClick={handleBooking} disabled={isLoading}>
                {isLoading ? 'Booking...' : 'Book Now'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default BookingForm;
