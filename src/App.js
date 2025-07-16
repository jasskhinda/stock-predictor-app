import React, { useState } from 'react';
import './App.css';
import { stockData } from './stockData';
import StockChart from './components/StockChart';
import PredictionModel from './components/PredictionModel';
import DataInput from './components/DataInput';

function App() {
  const [predictions, setPredictions] = useState([]);
  const [isTraining, setIsTraining] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>📈 AI Stock Predictor</h1>
        <p>Advanced Neural Network Prediction Engine</p>
        <div className="stock-ticker">
          <div className="ticker-content">
            AAPL: $175.25 (+2.5%) • GOOGL: $138.75 (+1.2%) • MSFT: $342.10 (-0.3%) • TSLA: $248.50 (+5.7%) • AMZN: $145.80 (+0.9%)
          </div>
        </div>
      </header>
      
      <main className="App-main">
        <DataInput stockData={stockData} />
        
        <PredictionModel 
          stockData={stockData}
          setPredictions={setPredictions}
          isTraining={isTraining}
          setIsTraining={setIsTraining}
        />
        
        <StockChart 
          stockData={stockData}
          predictions={predictions}
        />
      </main>
      
      <footer className="App-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AI Stock Predictor</h3>
            <p>Advanced Neural Network Prediction Engine</p>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 info@jasskhinda.com</p>
            <p>🌐 jasskhinda.com</p>
          </div>
          
          <div className="footer-section">
            <h4>Technology</h4>
            <p>Built with React.js & Brain.js</p>
            <p>Powered by Neural Networks</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Jass Khinda. All rights reserved.</p>
          <p className="footer-disclaimer">
            This application is for educational purposes only. Not financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;