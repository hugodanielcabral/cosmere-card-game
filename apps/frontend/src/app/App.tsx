import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { RoomPage } from "./pages/RoomPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route index element={<HomePage />} />
        <Route path="room/:id" element={<RoomPage />} />
      </Routes>
    </>
  );
};

export default App;
