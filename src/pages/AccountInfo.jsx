import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountInfoForm from "../components/auth/AccountInfoForm.jsx";

export default function Feedback() {
    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                Account Info
            </h1>
            <AccountInfoForm />
        </div>
    );
}
