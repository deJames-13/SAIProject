import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the Django API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/charts/api/virustotal-detection-types/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData); // Set the data from the response
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartStyle = location.pathname === "/charts/line" ? { marginLeft: "300px" } : {};
  return (
    <div style={chartStyle}>
      {/* Title Section */}
      <h2
        style={{
          marginBottom: "20px",
          color: "#333",
          fontSize: "24px",
        }}
      >
        VirusTotal Detection Types
      </h2>

      {/* Chart Section */}
      <ResponsiveContainer width="101%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="url"
            tick={{ fontSize: 10 }}
            angle={-360}
            textAnchor="end"
            interval={0} // Ensure all URLs show up
          />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Lines for each detection type */}
          <Line type="monotone" dataKey="phishing" stroke="#FF69B4" />
          <Line type="monotone" dataKey="malware" stroke="#FF4D4F" />
          <Line type="monotone" dataKey="spam" stroke="#FFD700" />
          <Line type="monotone" dataKey="clean" stroke="#82CA9D" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
