# Interactive Data Exploration Dashboard
Overview
This is an interactive web application that allows users to upload their own datasets (in CSV format) and explore them visually. The app calculates basic statistics, like the number of rows and columns, and generates scatter plots of the dataset. Users can download processed results as CSV or JSON files.

## Key Features:
- CSV File Upload: Users can upload their own datasets.
- Summary Statistics: Displays the number of rows and columns in the dataset.
- Visualizations: Generates an interactive scatter plot of the first two columns of the dataset.
- Download Options: Users can download the dataset statistics as a CSV or JSON file.

## Technologies Used
- Frontend: React, Next.js
- Data Processing: JavaScript, custom utility functions for statistical calculations
- Visualization: React Plotly (for scatter plot)
- Hosting: Vercel

## Installation
### 1. Clone the repository
```
git clone https://github.com/otopxy/data-exploration-dashboard.git
cd data-exploration-dashboard
```
### 2. Install dependencies
Install the required npm packages.

```
npm install
```

### 3. Start the development server
Start the application locally to test and develop.

```
npm run dev
```
You can now access the application at http://localhost:3000.

## Features
###1. File Upload
Upload a CSV file containing your dataset by clicking the "Upload CSV" button.
After the file is uploaded, the application will analyze the dataset and generate the basic statistics and visualizations.

### 2. Summary Statistics
The app will display the following:
- Number of Rows: Total number of rows in the dataset.
- Number of Columns: Total number of columns in the dataset.
- If any additional statistics are not available (e.g., if columns contain null values), they will be skipped.
  
### 3. Visualizations
- The app generates a scatter plot of the first two columns in the dataset.
- If the dataset is large or complex, this scatter plot can give an immediate visual sense of the data distribution.
  
### 4. Download Results
- Users can download the dataset's statistical summary in CSV or JSON format.
- Click the "Download as CSV" or "Download as JSON" button to get the summary.

### File Upload Details
- The app expects a CSV file where each row represents a data record and each column represents a feature/variable.
- The app supports any CSV file, but for visualization purposes, the first two columns are used to create the scatter plot.

## Screenshots
Welcome Screen
<img width="1120" alt="Screenshot 2025-03-03 at 6 36 10 PM" src="https://github.com/user-attachments/assets/031680fd-3684-4b80-9fe3-1deef7ee2892" />

<img width="1478" alt="Screenshot 2025-03-03 at 6 37 55 PM" src="https://github.com/user-attachments/assets/19962651-031f-4adf-a5a0-9dcd03e679e8" />



## Contributing
If you'd like to contribute to this project, feel free to fork the repository, create a branch, and submit a pull request with your changes.

## Steps for contribution:
- Fork this repository.
- Create a feature branch (git checkout -b feature-branch).
- Commit your changes (git commit -am 'Add new feature').
- Push the branch to your fork (git push origin feature-branch).
- Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
- React for building the user interface.
- Next.js for server-side rendering and routing.
- Plotly for creating interactive visualizations.
- Vercel for hosting the app.
