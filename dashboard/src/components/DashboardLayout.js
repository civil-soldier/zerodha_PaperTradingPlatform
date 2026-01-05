import { useEffect } from "react";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";

const DashboardLayout = () => {

  useEffect(() => {
    // Dashboard enter hote hi history lock
    window.history.pushState(null, "", window.location.href);

    const handleBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default DashboardLayout;
