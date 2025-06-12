import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardForm from '../components/auth/DashboardForm';

export default function Dashboard() {
    return (
        <div>
            <DashboardForm />
        </div>
    );
}
