// src/App.tsx
import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Inscription from './assets/pages/auth/Inscription'; 
import Connexion from './assets/pages/auth/Connexion';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/" element={<Navigate to="/connexion" />} />
      </Routes>
    </Router>
  );
};

export default App;
