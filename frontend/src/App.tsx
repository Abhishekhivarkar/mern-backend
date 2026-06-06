import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './routes/ProtectedRoutes'
import { PublicRoute } from './routes/PublicRoutes'
import { RegisterPage } from './features/auth/pages/RegisterPage'
import { AuthInitializer } from './features/auth/components/AuthInitializer'
import LoginPage from './features/auth/pages/LoginPage'

export default function App() {
  return (
    <>
    <div className='min-h-screen bg-black text-white'>
    <AuthInitializer/>
    <Routes>
      <Route path="/"
      element={
        <ProtectedRoute>

          <div>Home page</div>
        </ProtectedRoute>
      }
      />

     
  <Route
  path="/register"

  element={
    <PublicRoute>
      <RegisterPage/>
    </PublicRoute>
  }
  />
   <Route
    path="/login"
    element={
      <PublicRoute>
        <LoginPage/>
      </PublicRoute>
    }
   />
  </Routes>

 </div>

    </>    
  )
}
