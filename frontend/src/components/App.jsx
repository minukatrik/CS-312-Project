// Imports
import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Detail from "./Detail.jsx";
import Expense from "./Expense.jsx";
import Image from "./Image.jsx";
import Budget from "./Budget.jsx";


// The App function returns a "container" of components of the website
function App() {



  // Constants
  const curMonth = new Date().getMonth();
  const [ exps, setExps ] = useState([]);
  const [ monthly, setMonthly ] = useState([]);
  const [ monthIdx, setMonthIdx ] = useState( curMonth );



  useEffect( () => {
    fetch( "/api/expenses", {
      "method": "GET"
    })
      .then( res => res.json() )
      .then( data => setExps( data ) )
      .catch( err => console.log( err ) );

    fetch( "/api/monthly" , {
      "method": "GET"
    })
      .then( res => res.json() )
      .then( data => setMonthly( data ) )
      .catch( err => console.log( err ) );
  }, [] );

  // Nested functions

    const changeMonth = ( event ) => {
      // if ( event.target.value === "12") {
      //   setMonthIdx( curMonth );
      // }
      // else {
        setMonthIdx( event.target.value );
      // }
    }

    // The addExpense function returns a new array with new expense
    function addExpense( newExp ) {
      setExps( prevExps => [ ...prevExps, newExp ] );
      window.location.reload();
    }



    // The deleteExpense function returns new array without the deleted expense
    function deleteExpense( idx ) {
      setExps( prevExps => prevExps.filter( ( expItem, index ) => index !== idx ) );
      window.location.reload();
    }



  // Return container of all sections of website
  return (
    <div className="container">
      <Header />
      <Budget
        curMonth={ curMonth }
        monthSum={ monthly[ monthIdx ] }
        // monthly={ monthly }
        monthIdx={ monthIdx }
        changeMonth={ changeMonth }
      />
      <Detail
        exps={ monthly[ monthIdx ]?.exps }
        onDelete={ deleteExpense }
      />
      <Expense onAdd={ addExpense } />


    </div>
  );
}



// Export function
export default App;
