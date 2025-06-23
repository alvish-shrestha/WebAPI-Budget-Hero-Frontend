import React, { useContext, useEffect } from 'react';

import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import LearnMoreForm from '../components/auth/LearnMoreForm';

export default function Homepage() {
    return (
        <div>
            <Header />
            <LearnMoreForm />
            <Footer />
        </div>
    );
}
