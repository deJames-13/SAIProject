import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import MDBox from "components/MDBox"; // Using your MDBox component for consistent styling

const data = [
  { name: "Malware", value: 40 },
  { name: "Phishing", value: 30 },
  { name: "Trojan", value: 20 },
  { name: "Other", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function PieChartComponent() {
  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 64px)" // Full height minus header size
      marginLeft="250px" // Adjust this based on sidebar width
    >
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </MDBox>
  );
}

export default PieChartComponent;
