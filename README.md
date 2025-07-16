# Stock Market Predictor

A stock market prediction application using Brain.js neural network for price forecasting.

## Features

- Historical stock data visualization with 55 data points
- Neural network model using Brain.js
- Feedforward neural network with 2 hidden layers [10, 10]
- Real-time prediction generation
- Responsive design with Chart.js visualization
- Clear distinction between historical and predicted values

## Technologies Used

- React.js
- Brain.js (Neural Network Library)
- Chart.js & react-chartjs-2 (Data Visualization)
- CSS3 (Responsive Design)

## Model Architecture

- **Type**: Feedforward Neural Network
- **Hidden Layers**: [10, 10]
- **Activation Function**: Sigmoid
- **Learning Rate**: 0.01
- **Training Iterations**: 2000
- **Error Threshold**: 0.005
- **Window Size**: 5 days (for time series prediction)

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