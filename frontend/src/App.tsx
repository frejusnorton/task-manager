import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Connexion from "./assets/pages/auth/Connexion";
import Inscription from "./assets/pages/auth/Inscription";
import Header from "./assets/components/Header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Dashbord from "./assets/pages/dashbord/Dashbord";
import Statistiques from "./assets/pages/statistiques/statistique";

NProgress.configure({ showSpinner: false });

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <RouteHandler />
    </div>
  );
};

const RouteHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/connexion'); 
    } 
  }, [navigate]);

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Connexion />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/dashboard" element={<Dashbord />} />
      <Route path="/statistiques" element={<Statistiques />} />
    </Routes>
  );
};

export default App;
