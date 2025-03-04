import React, { useState } from 'react';
import Papa from 'papaparse';

const FileUpload = ({ onDataProcessed }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    
    // Parse the CSV file using PapaParse
    Papa.parse(uploadedFile, {
      complete: (result) => {
        onDataProcessed(result.data);  // Pass the parsed data to parent component
      }
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {file && <p>File selected: {file.name}</p>}
    </div>
  );
};

export default FileUpload;
