// Helper function to get CSRF token
const getCsrfToken = () => {
    const name = 'csrftoken';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { VITE_API_BASE_URL } from '../config/api';

const EventRegistration = ({ eventId }) => {
    const [status, setStatus] = useState(null);

    const registerForEvent = async () => {
        try {
            const response = await fetch(`${VITE_API_BASE_URL}/events/${eventId}/register/`, {
                method: 'POST',
                credentials: 'include',  // Include session cookies
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken(),  // Include the CSRF token
                },
            });

            const data = await response.json();
            if (response.status === 201) {
                setStatus(data.message);  // Registration successful or placed in queue
            } else {
                setStatus(data.error || data.message);  // Display error message
            }
        } catch (error) {
            console.error('Error registering for event:', error);
            setStatus('An error occurred during registration.');
        }
    };

    return (
        <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <button
                onClick={registerForEvent}
                className="bg-olive text-sand px-6 py-2 rounded-lg font-semibold shadow hover:bg-black hover:text-beige transition-colors flex items-center"
            >
                <CalendarCheck size={18} className="mr-2" />
                Register for Event
            </button>
            {status && (
                <motion.p 
                    className="mt-3 text-olive font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {status}
                </motion.p>
            )}
        </motion.div>
    );
};

export default EventRegistration;
