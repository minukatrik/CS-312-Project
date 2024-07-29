// Imports
import React, { useState } from "react";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";



// The Expense function returns the expense section of the website
function Expense( props ) {



  // Constants
  const [ isExpanded, setExpanded ] = useState( false );
  const [ isCategory, setCategory ] = useState( true );
  const [ exp, setExp ] = useState({
    title: "",
    newTitle: "",
    amount: "",
    date: "",
    description: ""
  });



  // Nested functions

    // The handleChange function gets current input from form
    function handleChange( event ) {

      // Get user input
      const { name, value } = event.target;

      // Determine if it's a new category
      if ( name === "title" ) {
        if ( value === "Other" ) {
          setCategory( false );
        }
        else {
          setCategory( true );
        }
      }

      // return user input
      setExp( prevExp => {
        return {
          ...prevExp,
          [ name ]: value
        };
      });
    }

    // The submitExp submits the info from the form to the expense array
    function submitExp( event ) {

      // Remove white space
      const isWhitespaceString = str => !str.replace(/\s/g, '').length

      console.log( exp );

      // If user filled in required fields
      if ( ( exp.title !== "" && exp.title !== "Other" || exp.title === "Other" &&
         !isWhitespaceString( exp.newTitle ) ) && Number( exp.amount ) !== 0 &&
         exp.date !== "" ) {

        // Add expense
        props.onAdd( exp );

        // Reset text input
        setExp({
          title: "",
          newTitle: "",
          amount: "",
          date: "",
          description: ""
        });
        setCategory( true );
        event.preventDefault();
      }

      // Else
      else {

        // Alert user to enter required fields
        alert( "Please enter required fields" );
      }
    }

    // The expand function sets isExpanded to true
    function expand() {
      setExpanded( true );
    }



  // Return expense section
  return (
    <div className="section add-expense">
        <h3>Add Expense</h3>
        <form>
          <select
            name="title"
            onClick = { expand }
            onChange={ handleChange }
            value={ exp.title }
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Groceries">Groceries</option>
            <option value="Other" >Other</option>
          </select>
          { !isCategory && (
          <input
            name="newTitle"
            type="text"
            onClick={ expand }
            placeholder="Expense Category"
            onChange={ handleChange }
            value={ exp.newTitle }
            required
          />
          )}
          <input
            name="amount"
            type="number"
            onClick={ expand }
            placeholder="Expense amount ($)"
            onChange={ handleChange }
            value={ exp.amount }
            required
          />
          <input
            name="date"
            type="date"
            onClick = { expand }
            placeholder="Date"
            onChange={ handleChange }
            value={ exp.date }
            required
          />
          { isExpanded && (
          <textarea
            name="description"
            placeholder="Description of expense (optional)"
            onChange={ handleChange }
            value={ exp.description }
            rows={ 3 }
          />)}

          <Zoom in={ isExpanded }>
            <Fab onClick={ submitExp }>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
    </div>
  );
}



// Export function
export default Expense;
