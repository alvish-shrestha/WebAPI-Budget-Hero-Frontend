import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackForm from "../components/auth/FeedbackForm.jsx";

export default function Feedback() {
    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                Submit Feedback
            </h1>
            <FeedbackForm />
        </div>
    );
}
