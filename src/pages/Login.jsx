import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'

export default function Login() {
  return (
    <div>
        <LoginForm />
    </div>
  )
}
