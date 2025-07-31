import React from 'react';
import { Navigate } from 'react-router-dom';

const PatientRoute = ({ children }) => {
  const token = localStorage.getItem('patientToken');
  return token ? children : <Navigate to="/patient/login" />;
};

export default PatientRoute;
