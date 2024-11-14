import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const BarChartComponent = () => {
  const [scanData, setScanData] = useState([]);

  useEffect(() => {
    // Fetch data from the Django backend
    axios.get('http://127.0.0.1:8000/api/charts/scan-data/')
      .then(response => {
        setScanData(response.data); // Update state with the data from the backend
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '80%', maxWidth: '500px' }}>
        <h2>Scans per Day</h2>
        {scanData.length > 0 ? (
          <BarChart
            width={500}
            height={300}
            data={scanData}  // Use the fetched data
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="scans" fill="#8884d8" />
          </BarChart>
        ) : (
          <p>Loading data...</p> // Display a loading message if data hasn't loaded yet
        )}
      </div>
    </div>
  );
};

export default BarChartComponent;
