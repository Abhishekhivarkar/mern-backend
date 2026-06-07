import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import { PublicRoute } from "./routes/PublicRoutes";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { AuthInitializer } from "./features/auth/components/AuthInitializer";
import LoginPage from "./features/auth/pages/LoginPage";
import { LogoutButton } from "./features/auth/components/LogoutButton";
import { CreateNotePage } from "./features/notes/pages/CreateNotePage";

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
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
              path="/"
              element={
                <>
                  <div>Home page</div>
                  <LogoutButton />
                </>
              }
            />

            <Route path="/note/create" element={<CreateNotePage />} />
          </Route>

          <Route
          path="*"
          element={<div>Page not found</div>}
          />

      
        </Routes>

        
      </div>
    </>
  );
}
