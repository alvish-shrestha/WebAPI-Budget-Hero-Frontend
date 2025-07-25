import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AdminMainLayout from '../layouts/admin/AdminMainLayout';
import UserManagement from '../pages/admin/UserManagement';
import SystemActivityManagement from '../pages/admin/SystemActivityManagement';
import FeedbackManagement from '../pages/admin/FeedbackManagement';
import DashboardManagement from '../pages/admin/DashboardManagement';
import Homepage from '../pages/Homepage';
import LearnMore from '../pages/LearnMore';
import Stats from "../pages/Stats";
import More from "../pages/More";
import Feedback from "../pages/Feedback";
import Transaction from "../pages/Transaction";
import Goal from "../pages/Goal";
import ResetPassword from "../pages/ResetPassword.jsx";

const AppRouter = () => (
  <Router>
    <Routes>
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      <Route path="/" element={<Homepage />} />
      <Route path="/learn-more" element={<LearnMore />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/goals" element={<Goal />} />
      <Route path="/more" element={<More />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/reset/password/:token" element={<ResetPassword />} />


      <Route path='/admin/*' element={<AdminMainLayout />}>
        <Route index element={<DashboardManagement />} />
        <Route path='users' element={<UserManagement />} />
        <Route path='system-activity' element={<SystemActivityManagement />} />
        <Route path='feedback' element={<FeedbackManagement />} />
        <Route path='*' element={<></>} />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;