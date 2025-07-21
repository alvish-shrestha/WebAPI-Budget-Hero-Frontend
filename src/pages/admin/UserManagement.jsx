import React from 'react'
import UserTable from '../../components/admin/UserTable'
import { Outlet } from 'react-router-dom'

export default function UserManagement() {
  return (
    <div>
      <UserTable />
    </div>
  )
}
