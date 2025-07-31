import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';

function ProviderAvailability() {
  const [availability, setAvailability] = useState({
    date: '',
    start_time: '',
    end_time: '',
    slot_duration: 30,
    location: 'clinic',
  });

  const [message, setMessage] = useState('');
  const [availabilityList, setAvailabilityList] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const fetchAvailability = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await api.get('/provider/availability', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAvailabilityList(response.data.availabilities || []);
    } catch (err) {
      console.error('Error fetching availability:', err);
      setMessage('Error fetching availability.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  const handleChange = (e) => {
    setAvailability((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitAvailability = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage('You are not authorized.');
      return;
    }

    try {
      setLoading(true);
      await api.post('/provider/availability', availability, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('✅ Availability added successfully!');
      fetchAvailability(); // Refresh list
      setAvailability({
        date: '',
        start_time: '',
        end_time: '',
        slot_duration: 30,
        location: 'clinic',
      });
    } catch (error) {
      console.error('Error adding availability:', error);
      if (error.response?.status === 401) {
        setMessage('❌ Unauthorized. Please login again.');
      } else if (error.response?.data?.message) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage('❌ Error adding availability.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2>Set Your Availability</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={submitAvailability}>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={availability.date}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label>Start Time</label>
          <input
            type="time"
            name="start_time"
            value={availability.start_time}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label>End Time</label>
          <input
            type="time"
            name="end_time"
            value={availability.end_time}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label>Slot Duration (minutes)</label>
          <input
            type="number"
            name="slot_duration"
            value={availability.slot_duration}
            className="form-control"
            onChange={handleChange}
            required
            min={5}
          />
        </div>

        <div className="form-group mt-2">
          <label>Location</label>
          <select
            name="location"
            value={availability.location}
            className="form-control"
            onChange={handleChange}
          >
            <option value="clinic">Clinic</option>
            <option value="telemedicine">Telemedicine</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3 w-100"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Availability'}
        </button>
      </form>

      <hr />

      <h4>My Availability List</h4>
      {loading ? (
        <p>Loading...</p>
      ) : availabilityList.length === 0 ? (
        <p>No availability slots set.</p>
      ) : (
        <ul className="list-group">
          {availabilityList.map((slot, index) => (
            <li key={index} className="list-group-item">
              <strong>{slot.date}</strong> | {slot.start_time} - {slot.end_time}{' '}
              | {slot.slot_duration} mins @ {slot.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProviderAvailability;
