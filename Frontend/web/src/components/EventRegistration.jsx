// Helper function to get CSRF token
const getCsrfToken = () => {
    const name = 'csrftoken';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

import React, { useState } from 'react';

const EventRegistration = ({ eventId }) => {
    const [status, setStatus] = useState(null);

    const registerForEvent = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}/register/`, {
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
        <div className="flex flex-col items-center">
            <button
                onClick={registerForEvent}
                className="bg-olive text-sand px-6 py-2 rounded-lg font-semibold shadow hover:bg-black hover:text-beige transition-colors"
            >
                Register for Event
            </button>
            {status && <p className="mt-3 text-olive">{status}</p>}
        </div>
    );
};

export default EventRegistration;
