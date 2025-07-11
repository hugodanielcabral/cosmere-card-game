import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { RoomPage } from "./pages/RoomPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import { Layout } from "../components/layouts/Layout";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="room/:id"
            element={
              <ProtectedRoute user={user}>
                <RoomPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
