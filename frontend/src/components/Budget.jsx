// Imports
import React, { useState, useEffect } from "react";

// The Budget function
function Budget() {

  const monthIdx = new Date().getMonth();
  const [ monthly, setMonthly ] = useState([]);

  useEffect( () => {
    fetch( "/api/monthly" , {
      "method": "GET"
    })
      .then( res => res.json() )
      .then( data => setMonthly( data ) )
      .catch( err => console.log( err ) );
  }, [] );

  return (
    <div className="section budget">
      <h3>{ monthly[monthIdx]?.month } Summary</h3>
      <div>Total Spending: ${ monthly[monthIdx]?.totalSpending }</div>
      <div>Average Daily Spending: ${ monthly[monthIdx]?.avgDailySpending }</div>
    </div>
  );
}



// Export function
export default Budget;
