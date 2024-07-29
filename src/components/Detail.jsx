import React, { useState } from "react";
import Item from "./Item.jsx";
import { groupExpensesByCategory } from "./utils";

function Detail({ exps, onDelete, onEdit }) {
  const groupedExpenses = groupExpensesByCategory(exps);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    onEdit(index);
  };

  return (
    <div className="section details">
      <h3>Details</h3>
      <div className="details-content">
        {Object.keys(groupedExpenses).map((category, idx) => (
          <div key={idx} className="category-group">
            <h4>{category}</h4>
            {groupedExpenses[category].map((expItem, index) => (
              <div key={index} className="item-container">
                <Item
                  id={index}
                  amount={expItem.amount}
                  title={expItem.title}
                  newTitle={expItem.newTitle}
                  date={expItem.date}
                  description={expItem.description}
                  onDelete={onDelete}
                />
                <button onClick={() => handleEditClick(index)}>Edit</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detail;

