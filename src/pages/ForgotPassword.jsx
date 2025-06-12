import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardForm from '../components/auth/DashboardForm';

export default function ForgotPassword() {
    return (
        <div>
            <DashboardForm />
        </div>
    );
}
