import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const LineChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/charts/fetch-url-report/")
      .then((response) => {
        if (response.data) {
          const urlData = response.data;

          const lineData = urlData.map((item) => {
            let undetectedCount = 0;
            let timeoutCount = 0;

            // Ensure last_analysis_results is not undefined or null before accessing it
            const analysisResults = item.last_analysis_results || {};

            // Loop through each engine's results and classify the status
            Object.values(analysisResults).forEach((engine) => {
              if (engine.result === "undetected") {
                undetectedCount += 1; // Count undetected results
              } else if (engine.result === "timeout") {
                timeoutCount += 1; // Count timeout results
              }
            });

            return {
              url: item.url,
              undetected: undetectedCount || 0, // Default to 0 if undefined
              timeout: timeoutCount || 0, // Default to 0 if undefined
            };
          });

          setData(lineData);
        } else {
          console.error("No data returned from API");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>URL Analysis: Undetected and Timeout</h2>
      <ResponsiveContainer width="400%" height={500}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="url" angle={-45} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="undetected" stroke="#3b82f6" dot={false} name="Undetected" />
          <Line type="monotone" dataKey="timeout" stroke="#e11d48" dot={false} name="Timeouts" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
