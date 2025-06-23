import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

export default function Login() {
  return (
    <div>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  )
}
