import React, { useState, useEffect } from 'react';
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
        <h1>Stock Market Predictor</h1>
        <p>Using Brain.js Neural Network</p>
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