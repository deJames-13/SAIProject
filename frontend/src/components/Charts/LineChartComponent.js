import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import MDBox from "components/MDBox";

const data = [
  { name: "Jan", Malware: 400, Phishing: 240, Trojan: 240 },
  { name: "Feb", Malware: 300, Phishing: 139, Trojan: 221 },
  { name: "Mar", Malware: 200, Phishing: 980, Trojan: 229 },
  { name: "Apr", Malware: 278, Phishing: 390, Trojan: 200 },
  { name: "May", Malware: 189, Phishing: 480, Trojan: 218 },
];

function LineChartComponent() {
  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 64px)"
      marginLeft="250px"
    >
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Malware" stroke="#8884d8" />
        <Line type="monotone" dataKey="Phishing" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Trojan" stroke="#ffc658" />
      </LineChart>
    </MDBox>
  );
}

export default LineChartComponent;
