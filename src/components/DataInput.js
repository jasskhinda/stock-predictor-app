import React from 'react';

function DataInput({ stockData }) {
  const minPrice = Math.min(...stockData.map(d => d.price));
  const maxPrice = Math.max(...stockData.map(d => d.price));
  const avgPrice = stockData.reduce((sum, d) => sum + d.price, 0) / stockData.length;
  const totalChange = ((stockData[stockData.length - 1].price - stockData[0].price) / stockData[0].price) * 100;
  
  return (
    <div className="data-input">
      <h2>📊 Market Data Analysis</h2>
      <div className="data-info">
        <div className="data-stat">
          <div className="data-stat-label">Total Data Points</div>
          <div className="data-stat-value">{stockData.length} days</div>
        </div>
        
        <div className="data-stat">
          <div className="data-stat-label">Date Range</div>
          <div className="data-stat-value">{stockData[0].date} to {stockData[stockData.length - 1].date}</div>
        </div>
        
        <div className="data-stat">
          <div className="data-stat-label">Price Range</div>
          <div className="data-stat-value">${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}</div>
        </div>
        
        <div className="data-stat">
          <div className="data-stat-label">Average Price</div>
          <div className="data-stat-value">${avgPrice.toFixed(2)}</div>
        </div>
        
        <div className="data-stat">
          <div className="data-stat-label">Total Return</div>
          <div className="data-stat-value" style={{color: totalChange >= 0 ? '#10b981' : '#ef4444'}}>
            {totalChange >= 0 ? '📈' : '📉'} {totalChange.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataInput;