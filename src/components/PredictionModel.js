import React, { useState } from 'react';

function PredictionModel({ stockData, setPredictions, isTraining, setIsTraining }) {
  const [trainingStatus, setTrainingStatus] = useState('');
  const [confidence, setConfidence] = useState(0);

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

  const trainModel = async () => {
    setIsTraining(true);
    setTrainingStatus('Initializing AI model...');
    setConfidence(0);

    try {
      const prices = stockData.map(d => d.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      
      const normalizedPrices = normalizeData(stockData);
      const trainingData = prepareTrainingData(normalizedPrices);

      setTrainingStatus('🧠 Training neural network...');

      const net = new window.brain.NeuralNetwork({
        hiddenLayers: [15, 10, 8],
        activation: 'sigmoid',
        learningRate: 0.03
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      await net.trainAsync(trainingData, {
        iterations: 3000,
        errorThresh: 0.003,
        log: true,
        logPeriod: 100,
        callback: (data) => {
          const progress = Math.min((data.iterations / 3000) * 100, 100);
          setConfidence(progress);
          setTrainingStatus(`🔥 Training... ${progress.toFixed(0)}% complete`);
        }
      });

      setTrainingStatus('🚀 Generating predictions...');

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
      const trend = calculateTrend(predictions);
      setTrainingStatus(`✅ Prediction complete! Model confidence: ${confidence.toFixed(1)}%`);
      
      // Add trend info to status
      if (trend) {
        setTimeout(() => {
          setTrainingStatus(`🎯 10-day forecast shows ${trend.direction === 'up' ? '📈 upward' : '📉 downward'} trend of ${trend.percentage}%`);
        }, 2000);
      }
      
    } catch (error) {
      setTrainingStatus('❌ Error: ' + error.message);
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="prediction-model">
      <h2>🤖 Neural Network Engine</h2>
      <div className="model-info">
        <div className="model-stat">
          <div>Architecture</div>
          <div>Feedforward NN</div>
        </div>
        <div className="model-stat">
          <div>Hidden Layers</div>
          <div>[15, 10, 8]</div>
        </div>
        <div className="model-stat">
          <div>Training Iterations</div>
          <div>3,000</div>
        </div>
        <div className="model-stat">
          <div>Window Size</div>
          <div>5 days</div>
        </div>
        <div className="model-stat">
          <div>Learning Rate</div>
          <div>0.03</div>
        </div>
        <div className="model-stat">
          <div>Prediction Horizon</div>
          <div>10 days</div>
        </div>
      </div>
      
      <button 
        onClick={trainModel} 
        disabled={isTraining}
        className="train-button"
      >
        {isTraining ? '⚡ Training AI Model...' : '🚀 Launch Prediction Engine'}
      </button>
      
      {trainingStatus && (
        <div className="training-status">
          {isTraining && <div className="loading-spinner"></div>}
          <p>{trainingStatus}</p>
          {isTraining && confidence > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${confidence}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PredictionModel;