import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

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
            console.log('Booking response:', data);
            if (response.ok) {
                toast.success('Booking successful!');
                navigate('/events');
            } else {
                toast.error(data.message || 'Booking failed.');
                setError(data.message || 'Booking failed.');
            }
        } catch (error) {
            console.error('Error during booking:', error);
            toast.error('Network error. Please try again later.');
            setError('Network error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div 
            className="flex flex-col items-center justify-center min-h-[40vh] bg-sand p-8 rounded-2xl shadow-xl border-2 border-olive max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <h2 className="text-2xl font-bold mb-6 text-olive">Book Seats</h2>
            <button
                onClick={handleBooking}
                disabled={isLoading}
                className="bg-olive text-sand px-6 py-2 rounded-lg font-semibold shadow hover:bg-black hover:text-beige transition-colors mb-4 flex items-center"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Booking...
                    </>
                ) : (
                    <>
                        <CalendarCheck size={18} className="mr-2" />
                        Book Now
                    </>
                )}
            </button>
            {error && (
                <motion.p 
                    className="text-red-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {error}
                </motion.p>
            )}
        </motion.div>
    );
};

export default BookingForm;
