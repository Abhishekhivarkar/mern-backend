import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import { PublicRoute } from "./routes/PublicRoutes";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { AuthInitializer } from "./features/auth/components/AuthInitializer";
import LoginPage from "./features/auth/pages/LoginPage";
import { CreateNotePage } from "./features/notes/pages/CreateNotePage";
import pageNotFound from "./assets/404.mp4"
import { GetAllNotesPage } from "./features/notes/pages/GetAllNotesPage";
import { Dashboard } from "./features/home/pages/Home";
export default function App() {
  return (
    <>
    
        <AuthInitializer />
        <Routes>
          {/* Public routes */}

          <Route element={<PublicRoute />}>
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Protected routes */}

          <Route element={<ProtectedRoute />}>

          <Route
          path="/notes/all"
          element={
            <GetAllNotesPage/>
          }
          />
            <Route
              path="/"
              element={
                <>
                  <Dashboard/>
                </>
              }
            />

            <Route path="/note/create" element={<CreateNotePage />} />
          </Route>

          <Route
            path="*"
            element={
            <div className="flex justify-center items-center h-screen">
            <video 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full"
            >
              <source 
              src={pageNotFound} type="video/mp4"
              />

            </video >
            </div>}
          />


            </Routes>

       
      
    </>
  );
}
