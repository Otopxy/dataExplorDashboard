// Utility to calculate basic statistics
export const calculateBasicStats = (data) => {
    // Convert the data into a numeric format (array of arrays)
    const numericData = Object.keys(data[0]).map((column) => {
      // Filter out non-numeric values and convert everything to numbers
      return data.map((row) => {
        const value = row[column];
        return isNaN(value) ? NaN : parseFloat(value);
      });
    });
  
    // Clean data by excluding NaN values for the statistics
    const cleanData = numericData.map((column) => column.filter((value) => !isNaN(value)));
  
    // Calculate mean
    const mean = cleanData.map((column) => column.reduce((acc, val) => acc + val, 0) / column.length);
  
    // Calculate median
    const median = cleanData.map((column) => {
      const sorted = [...column].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    });
  
    // Standard Deviation
    const stdDev = cleanData.map((column) => {
      const avg = mean[cleanData.indexOf(column)];
      const variance = column.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / column.length;
      return Math.sqrt(variance);
    });
  
    // Skewness and Kurtosis - simplified versions
    const skewness = cleanData.map((column) => {
      const avg = mean[cleanData.indexOf(column)];
      const n = column.length;
      const m3 = column.reduce((acc, val) => acc + Math.pow(val - avg, 3), 0) / n;
      const m2 = column.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / n;
      return m3 / Math.pow(m2, 1.5);
    });
  
    const kurtosis = cleanData.map((column) => {
      const avg = mean[cleanData.indexOf(column)];
      const n = column.length;
      const m4 = column.reduce((acc, val) => acc + Math.pow(val - avg, 4), 0) / n;
      const m2 = column.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / n;
      return m4 / Math.pow(m2, 2);
    });
  
    // Correlation Matrix
    const correlationMatrix = cleanData.map((column, i) => {
      return cleanData.map((compareColumn, j) => {
        const avgX = mean[i];
        const avgY = mean[j];
        const covariance = column.reduce((acc, val, idx) => acc + (val - avgX) * (compareColumn[idx] - avgY), 0) / column.length;
        const stdDevX = stdDev[i];
        const stdDevY = stdDev[j];
        return covariance / (stdDevX * stdDevY);
      });
    });
  
    return {
      numRows: data.length,
      numCols: Object.keys(data[0]).length,
      //mean,
      //median,
      //stdDev,
      //skewness,
      //kurtosis,
      //correlationMatrix,
    };
  };
  