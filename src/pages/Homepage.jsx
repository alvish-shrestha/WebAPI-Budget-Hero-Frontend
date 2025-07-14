import React from 'react';
import HomepageForm from '../components/auth/HomepageForm';
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"

export default function Homepage() {
    return (
        <div>
            <Header />
            <HomepageForm />
            <Footer />
        </div>
    );
}
