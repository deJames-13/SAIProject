import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const PieChartComponent = () => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    // Fetch pie chart data from the Django backend
    axios.get('http://127.0.0.1:8000/api/charts/pie-data/')
      .then(response => {
        setPieData(response.data); // Update state with the data from the backend
      })
      .catch(error => {
        console.error("Error fetching pie chart data:", error);
      });
  }, []);

  // Define the colors for the pie chart segments
  const COLORS = ['#ff7300', '#00C49F', '#FFBB28'];

  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
    <div style={{ width: '80%', maxWidth: '500px' }}>
      <h2>Scan Categories Distribution</h2>
      {pieData.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            dataKey="scans"
            nameKey="category"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>Loading data...</p> // Display a loading message if data hasn't loaded yet
      )}
    </div>
    </div>
    </div>
  );
};

export default PieChartComponent;
