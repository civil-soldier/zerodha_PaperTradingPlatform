import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import DashboardLayout from "./DashboardLayout";

const Home = () => {
  return (
    <Routes>
      {/* Login FIRST */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />


      {/* Protected dashboard */}
      <Route path="/*" element={<DashboardLayout />} />
    </Routes>
  );
};

export default Home;
