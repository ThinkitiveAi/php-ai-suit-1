import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function PatientProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/patient/profile')
      .then((res) => setProfile(res.data))
      .catch((err) => console.error('Profile load error:', err));
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="container mt-5">
      <h2>Welcome, {profile.first_name} {profile.last_name}</h2>
      <p>Email: {profile.email}</p>
      {/* Add more profile info */}
    </div>
  );
}

export default PatientProfile;
