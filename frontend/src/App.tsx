import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import Connexion from "./assets/pages/auth/Connexion";
import Inscription from "./assets/pages/auth/Inscription";
import '../nprogess.css'

const App: React.FC = () => {
  return (
    <Router>
      <RouteHandler />
    </Router>
  );
};

const RouteHandler: React.FC = () => {
  const location = useLocation(); 

  useEffect(() => {
    NProgress.start(); 

   
    const timer = setTimeout(() => {
      NProgress.done(); 
    }, 500); 

   
    return () => clearTimeout(timer);
  }, [location]); 
  return (
    <Routes>
      <Route path="/" element={<Connexion />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
    </Routes>
  );
};

export default App;
