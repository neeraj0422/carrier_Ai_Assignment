import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [positions, setPositions] = useState([]);
  const [signals, setSignals] = useState([]);

 

  useEffect(() => {
    // Fetch account information from your backend
    fetchAccountInfo();

    // Fetch positions from your backend
    fetchPositions();

    // Fetch trading signals from your backend
    fetchSignals();
  }, []);

  const fetchAccountInfo = async () => {
    try {
      // Send a GET request to your backend's /account-info route
      const response = await fetch('/account-info');
      const data = await response.json();
      setAccountInfo(data);
    } catch (error) {
      console.error('Error fetching account information:', error);
    }
  };

  const fetchPositions = async () => {
    try {
      // Send a GET request to your backend's /positions route
      const response = await fetch('/positions');
      const data = await response.json();
      setPositions(data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const fetchSignals = async () => {
    try {
      // Send a GET request to your backend's /signals route
      const response = await fetch('/signals');
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch trading signals');
      }
      
      // Parse the response as JSON
      const data = await response.json();
      setSignals(data);
    } catch (error) {
      console.error('Error fetching trading signals:', error);
      // Handle the error here, such as setting signals to an empty array
      setSignals([]);
    }
  };

  return (
    <div className="dashboard-bg">
        <div >
    <div className="container">
      <h1 className="heading">Dashboard</h1>
      <div className="account-info">
        <h2>Account Information</h2>
        {accountInfo ? (
          <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
        ) : (
          <p>Loading account information...</p>
        )}
      </div>
      <div className="positions">
        <h2>Positions</h2>
        {positions.length > 0 ? (
          <ul>
            {positions.map((position) => (
              <li key={position.id}>{JSON.stringify(position)}</li>
            ))}
          </ul>
        ) : (
          <p>No positions found.</p>
        )}
      </div>
      <div className="trading-signals">
        <h2>Trading Signals</h2>
        {signals.length > 0 ? (
          <ul>
            {signals.map((signal) => (
              <li key={signal.id}>{JSON.stringify(signal)}</li>
            ))}
          </ul>
        ) : (
          <p>No trading signals found.</p>
        )}
      </div>
    </div>
  </div>
  </div>
  );
};

export default Dashboard;
