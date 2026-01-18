import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./index.css";
import ScrollToTop from "./ScrollToTop";

import HomePage from "./landing_page/home/HomePage";
import SignupPage from "./landing_page/signup/SignupPage";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/product/ProductPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import NotFound from "./landing_page/NotFound";

import OtpPage from "./landing_page/signup/OtpPage";
import PublicLayout from "./landing_page/Layouts/PublicLayout";
import AuthLayout from "./landing_page/Layouts/AuthLayout";
import EmailAuth from "./landing_page/signup/EmailAuth";
import DetailsPage from "./landing_page/signup/DetailsPage";
import CredentialsPage from "./landing_page/signup/CredentialsPage";
import AccountActive from "./landing_page/signup/AccountActive";
import ProtectedRoute from "./ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ScrollToTop />

    <Routes>
      {/* PUBLIC WEBSITE */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* AUTH FLOW (OTP, KYC, etc.) */}
      <Route element={<AuthLayout />}>
        <Route path="/signup/otp" element={<OtpPage />} />
        <Route path="/signup/email" element={<EmailAuth />} />
        <Route path="/signup/email-otp" element={<OtpPage type="email" />} />
        <Route path="/signup/details" element={<DetailsPage />} />
        <Route
          path="/signup/credentials"
          element={
            !localStorage.getItem("token") &&
            localStorage.getItem("signup_mobile") ? (
              <CredentialsPage />
            ) : (
              <Navigate to="/account/active" replace />
            )
          }
        />
      </Route>

      <Route
        path="/account/active"
        element={
          <ProtectedRoute>
            <AccountActive />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>,
);
