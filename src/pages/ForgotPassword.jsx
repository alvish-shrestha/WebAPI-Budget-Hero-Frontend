import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

export default function ForgotPassword() {
    return (
        <div>
            <ForgotPasswordForm />
        </div>
    );
}
