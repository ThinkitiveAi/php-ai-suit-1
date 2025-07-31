import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function PatientLogin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/patient/login', { identifier, password });
      localStorage.setItem('token', response.data.token);
      navigate('/'); // Update with actual dashboard
    } catch {
      setError('Invalid login or password.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Patient Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <label>Email or Phone</label>
        <input className="form-control" value={identifier} onChange={e => setIdentifier(e.target.value)} required />
        <label className="mt-2">Password</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-success w-100 mt-3">Login</button>
      </form>
    </div>
  );
}

export default PatientLogin;
