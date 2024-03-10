import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const TradingViewAlertForm = () => {
  const [symbol, setSymbol] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send a POST request to your backend's tradingview-webhook endpoint
      const response = await axios.post(
        '/tradingview-webhook',
        {
          symbol,
          recommendation
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-tv-webhook-signature': 'YOUR_TRADINGVIEW_WEBHOOK_SIGNATURE' // Replace with your actual signature
          }
        }
      );

      // Handle successful response
      console.log('Alert sent successfully:', response.data);
      // Display a success message to the user or perform other actions
    } catch (error) {
      // Handle error
      console.error('Error sending alert:', error);
      // Display an error message to the user or perform other actions
    }
  };

  return (
    <div>
      <h2>TradingView Alert Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="symbol">Symbol:</label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="recommendation">Recommendation:</label>
          <input
            type="text"
            id="recommendation"
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Alert</button>
      </form>
    </div>
  );
};

export default TradingViewAlertForm;
