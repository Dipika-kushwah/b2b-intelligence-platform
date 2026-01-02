import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Trial from "./pages/Trial";
import Dashboard from "./pages/Dashboard";
import USCompanies from "./pages/USCompanies";
import StartupCompanies from "./pages/StartupCompanies";
import CompanySearch from "./pages/CompanySearch";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Trial />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/company-search" element={<CompanySearch />} />
      <Route path="/us-companies" element={<USCompanies />} />
      <Route path="/startup-companies" element={<StartupCompanies />} />
    </Routes>
  );
}
