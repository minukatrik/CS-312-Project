// Imports
import React from "react";



// React component for displaying graphs showing expenses by category.
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Image = () => {
  // Sample data for expenses by category
  const data = [
    { category: "Food", amount: 500 },
    { category: "Rent", amount: 1000 },
    { category: "Transportation", amount: 300 },
    { category: "Entertainment", amount: 200 },
    { category: "Utilities", amount: 400 },
  ];

  return (
    <div>
      <h2>Expenses by Category</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Image;
