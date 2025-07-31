import React from 'react';

import { Link, useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // 'patient' or 'provider'

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">Healthcare</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/provider/login">Provider Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/provider/register">Provider Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/patient/login">Patient Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/patient/register">Patient Register</Link>
              </li>
            </>
          ) : (
            <>
              {role === 'provider' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/provider/dashboard">Provider Dashboard</Link>
                </li>
              )}
              {role === 'patient' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/patient/dashboard">Patient Dashboard</Link>
                </li>
              )}
              <li className="nav-item">
                <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
