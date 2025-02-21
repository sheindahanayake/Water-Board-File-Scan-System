import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

import Header from "./components/common/Header";
import Hero from "./components/common/Hero";

import AboutUs from "./components/common/AboutUs";
import Footer from "./components/common/Footer";

import Listings from "./components/Listings";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";

import Login from "./components/admin/Login";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./components/admin/Dashboard";
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth";


import WssPage from "./components/WssPage";
import FormPage from "./components/FormPage";
import PtFormPage from "./components/PtFormPage";
import LbFormPage from "./components/LbFormPage";
import DwFormPage from "./components/DwFormPage";
import HrmFormPage from "./components/HrmFormPage";
import GaFormPage from "./components/GaFormPage";









function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
         
          <Route path="/header" element={<Header />} />
          <Route path="/hero" element={<Hero />} />
         
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/footer" element={<Footer />} />
         
          <Route path="/listings" element={<Listings />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
         
     
          <Route path="/Wss" element={<WssPage />} />
          <Route path="/Form" element={<FormPage />} />
          <Route path="/PtForm" element={<PtFormPage />} />
          <Route path="/LbForm" element={<LbFormPage />} />
          <Route path="/DwForm" element={<DwFormPage />} />
          <Route path="/HrmForm" element={<HrmFormPage />} />
          <Route path="/GaForm" element={<GaFormPage />} />
         
          

          {/*Admin Process */}
          <Route path="/admin/dashboard" element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          } />
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
