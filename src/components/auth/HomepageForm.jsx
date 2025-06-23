import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import expensesChart from '../../assets/images/expenses-chart.png';
import investmentGrowth from "../../assets/images/investment-growth.png";
import { useRef, useEffect } from 'react';

const HomepageForm = () => {
    // const videoRef = useRef(null);

    // useEffect(() => {
    //     const video = videoRef.current;
    //     if (video) {
    //         const playPromise = video.play();
    //         if (playPromise !== undefined) {
    //             playPromise.catch((error) => {
    //                 console.warn("Autoplay failed:", error);
    //             });
    //         }
    //     }
    // }, []);

    return (
        <div className="font-sans bg-[#FFF7F4] text-[#1F2937] overflow-x-hidden">
            {/* Hero Section */}
            <motion.section
                className="relative text-center py-16 bg-[#FFEDE9] overflow-hidden"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
                >
                    <source src="/videos/homepage.mp4" type="video/mp4" />
                    <p>Your browser does not support HTML5 video. <a href="/videos/homepage.mp4">Download it instead.</a></p>
                </video> */}

                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to Budget Hero</h1>
                <p className="text-gray-700 text-lg max-w-xl mx-auto mb-6">
                    Track your finances, grow investments, and achieve your savings goals!
                </p>
                <div className="space-x-4">
                    <Link to="/sign-up">
                        <motion.button
                            className="bg-[#F55345] text-white px-6 py-2 rounded hover:bg-[#e04538] transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>
                    </Link>
                    <Link to="/learn-more">
                        <motion.button
                            className="bg-white text-[#F55345] border border-[#F55345] px-6 py-2 rounded hover:bg-[#fff1ee] transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Learn More
                        </motion.button>
                    </Link>
                </div>
            </motion.section>

            {/* Expenses & Investment Growth */}
            <section className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4 py-12">
                {[...Array(2)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="bg-white rounded-xl shadow-md p-6"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, delay: i * 0.2, type: 'spring', stiffness: 300 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-bold mb-4 text-center">{i === 0 ? 'Expenses' : 'Investment Growth'}</h2>
                        <img
                            src={i === 0 ? expensesChart : investmentGrowth}
                            alt={i === 0 ? "Pie Chart" : "Investment Growth"}
                            className="w-full h-56 object-contain mx-auto"
                        />
                    </motion.div>
                ))}
            </section>


            {/* Why Choose Budget Hero */}
            <motion.section
                className="bg-white py-16 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold mb-12">Why Choose Budget Hero?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
                    {whyItems.map((item, i) => (
                        <motion.div
                            key={i}
                            className="bg-[#FFF4F2] p-6 rounded-xl shadow-md"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* How It Works */}
            <motion.section
                className="bg-[#FFF4F2] py-16 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
                    {howSteps.map((item, i) => (
                        <motion.div
                            key={i}
                            className="bg-white p-6 rounded-xl shadow-md"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <div className="text-2xl font-bold text-[#F55345] mb-2">{item.step}</div>
                            <div className="text-4xl mb-3">{item.icon}</div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

const whyItems = [
    { icon: '📩', title: 'Envelope Budgeting', desc: 'Manage your money in digital envelopes.' },
    { icon: '🎯', title: 'Micro-Investment Tracker', desc: 'Grow your savings through small investments.' },
    { icon: '📊', title: 'Gamified Savings', desc: 'Have fun reaching your financial milestones.' }
];

const howSteps = [
    { step: '1', title: 'Set your budget', icon: '💳' },
    { step: '2', title: 'Track your spending', icon: '📈' },
    { step: '3', title: 'Achieve your goals', icon: '🚩' }
];

export default HomepageForm;
