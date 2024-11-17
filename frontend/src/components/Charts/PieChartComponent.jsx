import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PieChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/charts/fetch-stats/")
      .then((response) => {
        const statsData = response.data;

        // Prepare data for Pie chart (cut URL and use detections count)
        const pieData = statsData.map((item) => ({
          name: item.url.split("/")[2], // Extract domain from URL
          value: item.detections, // Use detections as the value
        }));

        setData(pieData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA00FF",
    "#FF5722",
    "#795548",
    "#607D8B",
    "#FF4500",
    "#32CD32",
  ]; // Add more colors for a unique color per slice

  return (
    <div style={{ textAlign: "center" }}>
      <h2>URL Detection Statistics</h2> {/* Add header title */}
      <ResponsiveContainer width="800%" height={600}> {/* Adjust height */}
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={180} // Increase outer radius
            label={(entry) => `${entry.name} (${entry.value})`}
            labelLine={false} // Turn off label lines
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
