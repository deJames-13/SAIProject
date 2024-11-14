import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const LineChartComponent = () => {
  const [aggregateData, setAggregateData] = useState([]);

  useEffect(() => {
    // Fetch aggregate summary data from the Django backend
    axios.get('http://127.0.0.1:8000/api/charts/aggregate-summary/')
      .then(response => {
        setAggregateData(response.data); // Update state with the data from the backend
      })
      .catch(error => {
        console.error("Error fetching aggregate data:", error);
      });
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '80%', maxWidth: '500px' }}>
      <h2>Aggregate Summary (Daily)</h2>
      {aggregateData.length > 0 ? (
        <LineChart
          width={500}
          height={300}
          data={aggregateData}  // Use the fetched aggregate data
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_scans" stroke="#8884d8" />
          <Line type="monotone" dataKey="avg_scans" stroke="#82ca9d" />
        </LineChart>
      ) : (
        <p>Loading data...</p> // Display a loading message if data hasn't loaded yet
      )}
      </div>
      </div>
    </div>
  );
};

export default LineChartComponent;
