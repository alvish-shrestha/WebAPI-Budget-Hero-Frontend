import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import expensesChart from '../../assets/images/expenses-chart.png';
import investmentGrowth from "../../assets/images/investment-growth.png";

const HomepageForm = () => {
  return (
    <div className="font-sans bg-[#FFF7F4] text-[#1F2937] overflow-x-hidden">

      {/* Hero Section */}
      <motion.section
        className="relative text-center py-20 bg-gradient-to-b from-[#FFEDE9] to-[#FFF7F4] overflow-hidden shadow-inner"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Welcome to <span className="text-[#F55345]">Budget Hero</span>
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Track your finances, grow investments, and achieve your savings goals!
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/sign-up">
            <motion.button
              className="bg-[#F55345] text-white px-8 py-3 rounded-full shadow hover:bg-[#e04538] transition duration-200 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </Link>
          <Link to="/learn-more">
            <motion.button
              className="bg-white text-[#F55345] border border-[#F55345] px-8 py-3 rounded-full shadow hover:bg-[#fff1ee] transition duration-200 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* Expenses & Investment Growth */}
      <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 py-16">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-6 border border-[#fcdcd4]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, delay: i * 0.2, type: 'spring', stiffness: 300 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-[#F55345]">{i === 0 ? 'Expenses' : 'Investment Growth'}</h2>
            <img
              src={i === 0 ? expensesChart : investmentGrowth}
              alt={i === 0 ? "Pie Chart" : "Investment Growth"}
              className="w-full h-64 object-contain"
            />
          </motion.div>
        ))}
      </section>

      {/* Why Choose Budget Hero */}
      <motion.section
        className="bg-white py-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose <span className="text-[#F55345]">Budget Hero</span>?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {whyItems.map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#FFF4F2] p-6 rounded-2xl shadow-md border border-[#fcdcd4]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="bg-[#FFF4F2] py-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {howSteps.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md border border-[#fcdcd4]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-[#F55345] mb-2">{item.step}</div>
              <div className="text-5xl mb-3">{item.icon}</div>
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
