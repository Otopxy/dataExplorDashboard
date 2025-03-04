import { useState } from 'react';
import dynamic from 'next/dynamic';  // Import dynamic from next
import FileUpload from '../components/FileUpload';
import { calculateBasicStats } from '../utils/stats'; // Utility for basic statistics

// Dynamically import Plotly with SSR disabled
const Plotly = dynamic(() => import('react-plotly.js'), { ssr: false });

const HomePage = () => {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);

  // Function to process the uploaded data
  const handleDataProcessed = (data) => {
    setData(data);

    // Calculate basic statistics like mean, median, etc.
    const calculatedStats = calculateBasicStats(data);

    // Update the stats state with the calculated statistics
    setStats(calculatedStats);
  };

  // Render visualizations first
  const renderVisualizations = () => {
    if (!data) return null;

    // Scatter Plot
    const scatterData = {
      x: data.map((row) => row[Object.keys(row)[0]]), // x-axis using the first column
      y: data.map((row) => row[Object.keys(row)[1]]), // y-axis using the second column
      mode: 'markers',
      type: 'scatter',
      name: 'Scatter Plot',
    };

    // Histogram
    const histData = {
      x: data.map((row) => row[Object.keys(row)[0]]), // x-axis using the first column
      type: 'histogram',
      name: 'Histogram',
    };

    // Heatmap (Assuming a 2D numeric dataset)
    const heatmapData = {
      z: data.map((row) => Object.values(row)), // 2D numeric data for the heatmap
      type: 'heatmap',
      
      name: 'Heatmap',
    };

    return (
      <div>
        <h2>Visualizations</h2>
        <div>
        {/* Scatter Plot */}
        <div className="plot-container">
          <Plotly
            data={[scatterData]}
            layout={{
              title: 'Scatter Plot of First vs. Second Column',
              xaxis: { title: 'First Column' },
              yaxis: { title: 'Second Column' },
              showlegend: true,
            }}
          />
          </div>
        </div>
        
        {/* Histogram */}
        <div className="plot-container">
          <Plotly
            data={[histData]}
            layout={{
              title: 'Histogram of First Column',
              xaxis: { title: 'First Column Values' },
              yaxis: { title: 'Frequency' },
              showlegend: true,
            }}
          />
        </div>
        
        {/* Heatmap */}
        <div className="plot-container">
          <Plotly
            data={[heatmapData]}
            layout={{
              title: 'Heatmap of Data Values',
              xaxis: { title: 'Columns' },
              yaxis: { title: 'Rows' },
              showlegend: true,
            }}
          />
        </div>
      </div>
    );
  };

  // Render statistics summary
  const renderStatisticsSummary = () => {
    if (!stats) return null;

    // Handle null statistics and replace with a user-friendly message
    const handleNullStats = (stat) => {
      return stat.map(item => (item === null ? 'Not available for this dataset' : item));
    };

    return (
      <div>
        <h2>Summary Statistics</h2>
        <ul>
          <li><strong>Number of Rows:</strong> {stats.numRows}</li>
          <li><strong>Number of Columns:</strong> {stats.numCols}</li>
      {/* <li><strong>Mean:</strong> {JSON.stringify(handleNullStats(stats.mean))}</li>
        <li><strong>Median:</strong> {JSON.stringify(handleNullStats(stats.median))}</li>
        <li><strong>Standard Deviation:</strong> {JSON.stringify(handleNullStats(stats.stdDev))}</li>
        <li><strong>Skewness:</strong> {JSON.stringify(handleNullStats(stats.skewness))}</li>
        <li><strong>Kurtosis:</strong> {JSON.stringify(handleNullStats(stats.kurtosis))}</li>
        <li><strong>Correlation Matrix:</strong></li>
        <pre>{JSON.stringify(handleNullStats(stats.correlationMatrix), null, 2)}</pre> */}
        </ul>
      </div>
    );
  };

  // Handle data download functionality
  const handleDownload = (format) => {
    let dataToDownload;

    if (format === 'csv') {
      // Convert stats or original data to CSV
      dataToDownload = Object.keys(stats).map((key) => ({
        stat: key,
        value: JSON.stringify(stats[key]),
      }));

      const csv = dataToDownload
        .map((row) => Object.values(row).join(','))
        .join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'stats.csv';
      link.click();
    } else if (format === 'json') {
      // Download as JSON
      const blob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'stats.json';
      link.click();
    }
  };

  return (
    <div className="page-wrapper">
      <h1>Welcome to the Interactive Data Exploration Dashboard</h1>
      <p>Upload your CSV dataset to perform data analysis and view visualizations like scatter plots, histograms, and heatmaps.</p>
      <p><strong>How to use:</strong> Click the "Upload CSV" button below to upload your file. The app will automatically analyze the data and generate statistical summaries and visualizations for you.</p>

      <FileUpload onDataProcessed={handleDataProcessed} />
      
      {/* Render visualizations */}
      {renderVisualizations()}

      {/* Render statistics summary */}
      {renderStatisticsSummary()}

      {/* Download buttons */}
      <div className="download-buttons">
        <button onClick={() => handleDownload('csv')}>Download as CSV</button>
        <button onClick={() => handleDownload('json')}>Download as JSON</button>
      </div>
    </div>
  );
};

export default HomePage;
