import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";

const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // lock history only AFTER login
    window.history.pushState(null, "", window.location.href);
    const handleBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default DashboardLayout;
