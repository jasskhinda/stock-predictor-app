# Stock Market Predictor

A stock market prediction application using Brain.js neural network for price forecasting.

## Features

- 🎨 **Glassmorphism UI Design** - Modern gradient backgrounds with glass-like transparency effects
- 📊 **Advanced Data Analytics** - Comprehensive market analysis with 55+ historical data points
- 🧠 **Enhanced Neural Network** - Deep architecture with 3 hidden layers [15, 10, 8]
- 📈 **Real-time Stock Ticker** - Animated ticker showing live market data
- 🚀 **Interactive Training Process** - Animated loading with progress tracking
- 📉 **Trend Analysis** - Bullish/Bearish indicators with percentage predictions
- 🎯 **Confidence Scoring** - AI model confidence measurement
- 💫 **Smooth Animations** - Hover effects and smooth transitions throughout
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🔮 **Prediction Cards** - Individual forecast cards for next 5 days

## Technologies Used

- React.js
- Brain.js (Neural Network Library)
- Chart.js & react-chartjs-2 (Data Visualization)
- CSS3 (Responsive Design)

## Model Architecture

- **Type**: Deep Feedforward Neural Network
- **Hidden Layers**: [15, 10, 8] (3-layer deep architecture)
- **Activation Function**: Sigmoid
- **Learning Rate**: 0.03 (optimized)
- **Training Iterations**: 3000 (enhanced training)
- **Error Threshold**: 0.003 (improved accuracy)
- **Window Size**: 5 days (time series prediction)
- **Prediction Horizon**: 10 days
- **Confidence Tracking**: Real-time training progress

## Dataset Format

The application uses a JSON format for stock data:
```javascript
{
  date: 'YYYY-MM-DD',
  price: 123.45
}
```

The included dataset contains 55 historical data points from January to March 2024.

## How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/jasskhinda/stock-predictor-app.git
cd stock-predictor-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Special Features

### 🎨 Advanced UI/UX Design
- **Glassmorphism Effects**: Transparent cards with backdrop blur
- **Gradient Backgrounds**: Custom animated gradient overlays
- **Micro-animations**: Hover effects, loading spinners, and transitions
- **Typography**: Google Fonts Inter for modern readability

### 🤖 Enhanced AI Features
- **Real-time Progress Tracking**: Visual progress bar during training
- **Trend Analysis**: Automatic bullish/bearish trend detection
- **Confidence Scoring**: Model reliability measurement
- **Interactive Predictions**: Clickable prediction cards

### 📊 Professional Data Visualization
- **Advanced Chart Styling**: Custom colors, tooltips, and animations
- **Market Analysis**: Comprehensive data statistics and insights
- **Live Stock Ticker**: Animated header with market updates

## Usage

1. View the historical stock data information
2. Click "Train Model & Predict" to train the neural network
3. The model will train on the historical data and generate 10 future predictions
4. View the combined chart showing both historical (blue) and predicted (red dashed) prices

## Component Structure

- `App.js` - Main application component
- `components/DataInput.js` - Displays dataset information
- `components/PredictionModel.js` - Neural network training and prediction logic
- `components/StockChart.js` - Chart.js visualization component
- `stockData.js` - Historical stock data

## Third-Party Libraries

- brain.js (v2.0.0-beta.23) - Neural network library
- chart.js (v4.4.7) - Chart library
- react-chartjs-2 (v5.2.0) - React wrapper for Chart.js

## Deployment

Deployed on Vercel: [deployment-url]

## Author

Jass Khinda

## License

MIT