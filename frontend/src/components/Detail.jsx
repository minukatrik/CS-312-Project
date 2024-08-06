// Imports
import React from "react";
import Item from "./Item.jsx";



// The Detail function returns the detail section of the website
function Detail( { exps, onDelete } ) {

  return (
    <div className="section details">
        <h3>Expenses</h3>
        <div className="details-content">
          { exps?.map( ( expItem, index ) => {
            return (
              <Item
                key={ index }
                index={ index }
                _id={ expItem._id }
                amount={ expItem.amount }
                title={ expItem.title }
                newTitle={ expItem.newTitle }
                date={ expItem.date}
                description={ expItem.description }
                onDelete={ onDelete }
              />
            );
          })}
        </div>
    </div>
  );
}



// Export function
export default Detail;
