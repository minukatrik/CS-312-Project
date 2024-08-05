// Imports
import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie, Bar, Line } from "react-chartjs-2";
import { colors } from "../colors.js"

function Charts( { monthSum, monthIdx } ) {

  const categories = monthSum?.categoryTotals.map( cat => cat.title );
  const catAmounts = monthSum?.categoryTotals.map( cat => cat.amount );
  const labels = monthSum?.dailyTotals.map( item => item.day );
  const amounts = monthSum?.dailyTotals.map( item => item.total );

  return (
    <div className="charts">
      <Bar
        data={{
          labels: categories,
          datasets: [
            {
              label: "Category Total",
              data: catAmounts
            }
          ]
        }}
      />
      <Pie
        data={{
          labels: categories,
          datasets: [
            {
              data: catAmounts,
              backgroundColor: colors
            }
          ]
        }}
      />
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: "Days in " + monthSum?.month + " Expense Costs",
              data: amounts
            }
          ]
        }}
      />
    </div>
  );

}

export default Charts;
