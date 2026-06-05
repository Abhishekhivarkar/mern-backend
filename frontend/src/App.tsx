import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './routes/ProtectedRoutes'
import { PublicRoute } from './routes/PublicRoutes'
import { RegisterPage } from './features/auth/pages/RegisterPage'

export default function App() {
  return (
    <>
    <Routes>
  <Route
  path="/register"

  element={
    <PublicRoute>
      <RegisterPage/>
    </PublicRoute>
  }
  />
  </Routes>
    </>    
  )
}
