import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// ✅ Corrected import paths based on actual file names
import ProviderLogin from './components/Provider/Login';
import PatientLogin from './components/Patient/Login';
import ProviderRegister from './components/Provider/Register';
import PatientRegister from './components/Patient/Register';

import ProviderDashboard from './components/Provider/ProviderDashboard';
import PatientDashboard from './components/Patient/PatientDashboard';

import ProviderRoute from './components/Provider/ProviderRoute';
import PatientRoute from './components/Patient/PatientRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/provider/login" element={<ProviderLogin />} />
        <Route path="/provider/register" element={<ProviderRegister />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/register" element={<PatientRegister />} />

        {/* Protected Routes */}
        <Route
          path="/provider/dashboard"
          element={
            <ProviderRoute>
              <ProviderDashboard />
            </ProviderRoute>
          }
        />
        <Route
          path="/patient/dashboard"
          element={
            <PatientRoute>
              <PatientDashboard />
            </PatientRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
