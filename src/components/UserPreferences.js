import React, { useState, useEffect } from 'react';

const UserPreferences = () => {
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    fetchUserPreferences();
  }, []);

  const fetchUserPreferences = async () => {
    try {
      const token = getToken(); // Function to retrieve the token from local storage or state
      const response = await fetch('http://localhost:3001/my-preferences', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPreferences(data.tickers); // Assuming the tickers are stored in an array under the 'tickers' key
      } else {
        console.error('Failed to fetch user preferences');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to retrieve token from local storage or state
  const getToken = () => {
    // Implement your logic to retrieve the token from local storage or state
    // For example:
    return localStorage.getItem('token');
  };

  return (
    <div>
      <h1>User Preferences</h1>
      <ul>
        {preferences.map(preference => (
          <li key={preference}>{preference}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPreferences;
