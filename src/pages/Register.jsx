import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

export default function Register() {
    return (
        <div>
            <Header />
            <RegisterForm />
            <Footer />
        </div>
    );
}
