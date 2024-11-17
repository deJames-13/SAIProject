import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const VirusChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/charts/fetch-data/")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Virus Detection Analysis</h2> {/* Add header title */}
    <ResponsiveContainer width="400%" height={500}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="url" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="harmless" fill="#82ca9d" />
        <Bar dataKey="malicious" fill="#ff4d4f" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default VirusChart;
