import React from 'react';

function DataInput({ stockData }) {
  return (
    <div className="data-input">
      <h2>Historical Stock Data</h2>
      <div className="data-info">
        <p>Dataset contains {stockData.length} data points</p>
        <p>Date range: {stockData[0].date} to {stockData[stockData.length - 1].date}</p>
        <p>Price range: ${Math.min(...stockData.map(d => d.price)).toFixed(2)} - ${Math.max(...stockData.map(d => d.price)).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default DataInput;