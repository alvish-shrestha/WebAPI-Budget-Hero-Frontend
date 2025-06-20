import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import AdminMainLayout from '../layouts/admin/AdminMainLayout';
import UserManagement from '../pages/admin/UserManagement';
import SystemActivityManagement from '../pages/admin/SystemActivityManagement';
import FeedbackManagement from '../pages/admin/FeedbackManagement';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path='/admin/*' element={<AdminMainLayout/>}>
        <Route index element={<UserManagement/>}/>
        <Route path='system-activity' element={<SystemActivityManagement/>}/>
        <Route path='feedback' element={<FeedbackManagement/>}/>
        <Route path='*' element={<></>}/>
      </Route>
      
    </Routes>
  </Router>
);

export default AppRouter;