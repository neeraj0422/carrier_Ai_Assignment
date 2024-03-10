import React from 'react';

const TradingSignalsList = ({ signals }) => {
  return (
    <div>
      <h2>Trading Signals</h2>
      {signals.length > 0 ? (
        <ul>
          {signals.map((signal, index) => (
            <li key={index}>
              <strong>Signal: {signal.signal}</strong> - {signal.ticker} ({signal.exchange})
            </li>
          ))}
        </ul>
      ) : (
        <p>No trading signals found.</p>
      )}
    </div>
  );
};

export default TradingSignalsList;
