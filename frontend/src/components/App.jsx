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
  const [ exps, setExps ] = useState([]);


  useEffect( () => {
    fetch( "/api/expenses", {
      "method": "GET"
    })
      .then( res => res.json() )
      .then( data => setExps( data ) );
  }, [] );


  // Nested functions

    // The addExpense function returns a new array with new expense
    function addExpense( newExp ) {
      setExps( prevExps => {
        return [ ...prevExps, newExp ];
      });
    }

    // The deleteExpense function returns new array without the deleted expense
    function deleteExpense( idx ) {
      setExps( prevExps => prevExps.filter( ( expItem, index ) => index !== idx));
    };



  // Return container of all sections of website
  return (
    <div className="container">
      <Header />
      <Detail
        exps={ exps }
        onDelete={ deleteExpense }
      />
      <Expense onAdd={ addExpense } />
      <Image />
      <Budget />
    </div>
  );
}



// Export function
export default App;
