import pandas as pd
import numpy as np
import json
from scipy.stats import skew, kurtosis
from sklearn.linear_model import LinearRegression

def handler(request):
    # Parse the request body (CSV file as raw data)
    body = request.get_data(as_text=True)
    data = pd.read_csv(pd.compat.StringIO(body))  # Reading the CSV into a pandas dataframe

    # Calculate basic statistics
    stats = {
        'mean': data.mean().to_dict(),
        'median': data.median().to_dict(),
        'std_dev': data.std().to_dict(),
        'correlation': data.corr().to_dict(),
        'skewness': data.apply(skew).to_dict(),
        'kurtosis': data.apply(kurtosis).to_dict(),
    }
    
    # Perform linear regression on the first two numerical columns (if available)
    regression_results = {}
    numerical_columns = data.select_dtypes(include=[np.number]).columns.tolist()

    if len(numerical_columns) >= 2:
        x = data[numerical_columns[0]].values.reshape(-1, 1)  # Independent variable (X)
        y = data[numerical_columns[1]].values.reshape(-1, 1)  # Dependent variable (Y)

        reg = LinearRegression().fit(x, y)
        regression_results = {
            'slope': reg.coef_[0][0],
            'intercept': reg.intercept_[0],
            'r_squared': reg.score(x, y)
        }
    
    # Combine statistics and regression results
    stats['regression'] = regression_results

    # Return the JSON response with all the statistics
    return json.dumps(stats), 200
