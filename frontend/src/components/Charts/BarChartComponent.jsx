import React, { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const VirusStatsChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the Django API
    useEffect(() => {
        fetch(`${import.meta.env.VITE_APP_API_URL}/charts/api/virustotal-stats/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData) => {
                // Directly set the data received from the backend
                setData(jsonData);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const chartStyle = location.pathname === "/charts/bar" ? { marginLeft: "300px" } : {};

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
                Distribution of VirusTotal Statuses
            </h2>

            {/* Chart Section */}
            <ResponsiveContainer width="101%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="url" tick={{ fontSize: 10 }} angle={-360} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="harmless" fill="#82ca9d" />
                    <Bar dataKey="malicious" fill="#ff4d4f" />
                    <Bar dataKey="suspicious" fill="#ffcc00" />
                    <Bar dataKey="undetected" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VirusStatsChart;
