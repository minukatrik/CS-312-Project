// Imports
import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie, Bar, Line } from "react-chartjs-2";
import { colors } from "../colors.js"

function Charts( { monthSum, monthIdx } ) {

  const labels = monthSum?.categoryTotals?.map( cat => cat.title );
  const amounts = monthSum?.exps?.map( exp => exp.amount );
  const catAmounts = monthSum?.categoryTotals?.map( cat => cat.amount );
  const days = new Date( 2024 , monthIdx + 1, 0 ).getDate();


  return (
    <div className="charts">
      <Bar
        data={{
          labels: labels,
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
          labels: labels,
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
          labels: Array.from( { length: days }, ( _, i ) => i + 1 ),
          datasets: [
            {
              label: monthSum?.month + " Expense Costs",
              data: amounts
            }
          ]
        }}
      />
    </div>
  );

}

export default Charts;
