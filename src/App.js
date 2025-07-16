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
    </div>
  );
}

export default App;