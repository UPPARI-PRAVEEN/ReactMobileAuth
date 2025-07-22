import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux';

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // debugger
  //   if (token) navigate('/home');
  //   else navigate('/login');
  // }, [token]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default App;