import React from 'react';
import ProviderAvailability from './Availability';

function ProviderDashboard() {
  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4">Welcome, Provider!</h2>
      <ProviderAvailability />
    </div>
  );
}

export default ProviderDashboard;
