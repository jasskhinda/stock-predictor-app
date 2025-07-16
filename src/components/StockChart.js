import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function StockChart({ stockData, predictions }) {
  const calculateTrend = (predictions) => {
    if (predictions.length < 2) return null;
    const firstPrice = predictions[0].price;
    const lastPrice = predictions[predictions.length - 1].price;
    const change = ((lastPrice - firstPrice) / firstPrice) * 100;
    return {
      direction: change >= 0 ? 'up' : 'down',
      percentage: Math.abs(change).toFixed(2)
    };
  };

  const trend = calculateTrend(predictions);

  const chartData = {
    labels: [
      ...stockData.map(d => d.date),
      ...predictions.map(p => p.date)
    ],
    datasets: [
      {
        label: 'Historical Prices',
        data: [
          ...stockData.map(d => d.price),
          ...new Array(predictions.length).fill(null)
        ],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: false,
        pointRadius: 2,
        pointHoverRadius: 6,
        borderWidth: 3
      },
      {
        label: 'AI Predictions',
        data: [
          ...new Array(stockData.length - 1).fill(null),
          stockData[stockData.length - 1].price,
          ...predictions.map(p => p.price)
        ],
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderDash: [8, 4],
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 8,
        borderWidth: 3,
        pointBackgroundColor: 'rgba(239, 68, 68, 1)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 14,
            weight: '600'
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: '📊 Stock Price Analysis & AI Forecasting',
        color: 'white',
        font: {
          size: 18,
          weight: '700'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)',
          color: 'white',
          font: {
            size: 14,
            weight: '600'
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          },
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          color: 'white',
          font: {
            size: 14,
            weight: '600'
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          },
          maxTicksLimit: 10
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <div className="stock-chart">
      <h2>📈 Advanced Market Visualization</h2>
      
      {trend && (
        <div className={`trend-indicator trend-${trend.direction}`}>
          {trend.direction === 'up' ? '📈' : '📉'} 
          Predicted trend: {trend.direction === 'up' ? 'Bullish' : 'Bearish'} 
          ({trend.percentage}% change)
        </div>
      )}
      
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
      
      {predictions.length > 0 && (
        <div className="prediction-cards">
          {predictions.slice(0, 5).map((prediction, index) => (
            <div key={index} className="prediction-card">
              <div className="prediction-date">
                Day +{index + 1}
              </div>
              <div className="prediction-date">
                {new Date(prediction.date).toLocaleDateString()}
              </div>
              <div className="prediction-price">
                ${prediction.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StockChart;