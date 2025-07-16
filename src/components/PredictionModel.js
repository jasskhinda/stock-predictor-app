import React, { useState } from 'react';

function PredictionModel({ stockData, setPredictions, isTraining, setIsTraining }) {
  const [trainingStatus, setTrainingStatus] = useState('');

  const normalizeData = (data) => {
    const prices = data.map(d => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return prices.map(price => (price - min) / (max - min));
  };

  const denormalizePrice = (normalized, min, max) => {
    return normalized * (max - min) + min;
  };

  const prepareTrainingData = (normalizedPrices, windowSize = 5) => {
    const trainingData = [];
    for (let i = windowSize; i < normalizedPrices.length; i++) {
      const input = normalizedPrices.slice(i - windowSize, i);
      const output = [normalizedPrices[i]];
      trainingData.push({ input, output });
    }
    return trainingData;
  };

  const trainModel = async () => {
    setIsTraining(true);
    setTrainingStatus('Preparing data...');

    try {
      const prices = stockData.map(d => d.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      
      const normalizedPrices = normalizeData(stockData);
      const trainingData = prepareTrainingData(normalizedPrices);

      setTrainingStatus('Training neural network...');

      const net = new window.brain.NeuralNetwork({
        hiddenLayers: [10, 10],
        activation: 'sigmoid',
        learningRate: 0.01
      });

      await net.trainAsync(trainingData, {
        iterations: 2000,
        errorThresh: 0.005,
        log: true,
        logPeriod: 100
      });

      setTrainingStatus('Generating predictions...');

      const lastWindowSize = 5;
      const lastWindow = normalizedPrices.slice(-lastWindowSize);
      const predictions = [];
      let currentInput = [...lastWindow];

      for (let i = 0; i < 10; i++) {
        const prediction = net.run(currentInput)[0];
        const denormalizedPrice = denormalizePrice(prediction, min, max);
        
        const lastDate = new Date(stockData[stockData.length - 1].date);
        const predictionDate = new Date(lastDate);
        predictionDate.setDate(predictionDate.getDate() + i + 1);
        
        predictions.push({
          date: predictionDate.toISOString().split('T')[0],
          price: denormalizedPrice,
          isPrediction: true
        });

        currentInput.shift();
        currentInput.push(prediction);
      }

      setPredictions(predictions);
      setTrainingStatus('Prediction complete!');
    } catch (error) {
      setTrainingStatus('Error: ' + error.message);
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="prediction-model">
      <h2>Neural Network Model</h2>
      <div className="model-info">
        <p>Architecture: Feedforward Neural Network</p>
        <p>Hidden Layers: [10, 10]</p>
        <p>Training Iterations: 2000</p>
        <p>Window Size: 5 days</p>
      </div>
      
      <button 
        onClick={trainModel} 
        disabled={isTraining}
        className="train-button"
      >
        {isTraining ? 'Training...' : 'Train Model & Predict'}
      </button>
      
      {trainingStatus && (
        <div className="training-status">
          <p>{trainingStatus}</p>
        </div>
      )}
    </div>
  );
}

export default PredictionModel;