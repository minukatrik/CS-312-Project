// Imports
import React, { useState, useEffect } from "react";
import Charts from "./Charts.jsx";

// The Budget function
function Budget( { curMonth, monthSum, monthIdx, changeMonth } ) {

  // const curMonth = new Date().getMonth();

  // const [ monthIdx, setMonthIdx ] = useState( curMonth );
  // const [ monthly, setMonthly ] = useState([]);

  // useEffect( () => {
  //   fetch( "/api/monthly" , {
  //     "method": "GET"
  //   })
  //     .then( res => res.json() )
  //     .then( data => setMonthly( data ) )
  //     .catch( err => console.log( err ) );
  // }, [] );

  // const changeMonth = ( event ) => {
  //   if ( event.target.value === "12") {
  //     setMonthIdx( curMonth );
  //   }
  //   else {
  //     setMonthIdx( event.target.value );
  //   }
  // };

  return (
    <div className="section budget">
      <select
        className="monthDropdown"
        onChange={ changeMonth }
      >
        <option value={ curMonth }>Current Month</option>
        <option value={0}>January</option>
        <option value={1}>February</option>
        <option value={2}>March</option>
        <option value={3}>April</option>
        <option value={4}>May</option>
        <option value={5}>June</option>
        <option value={6}>July</option>
        <option value={7}>August</option>
        <option value={8}>Septemeber</option>
        <option value={9}>October</option>
        <option value={10}>November</option>
        <option value={11}>December</option>
      </select>
      <h3>{ monthSum?.month } Summary</h3>
      <div>Total Spending: ${ monthSum?.totalSpending }</div>
      <div>Average Daily Spending: ${ monthSum?.avgDailySpending.toFixed( 2 ) }</div>
      <Charts
        monthSum={ monthSum }
        monthIdx={ monthIdx }
      />
    </div>
  );
}



// Export function
export default Budget;
