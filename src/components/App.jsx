import React, { useState } from "react";
import Header from "./Header.jsx";
import Detail from "./Detail.jsx";
import Expense from "./Expense.jsx";
import Image from "./Image.jsx";
import Budget from "./Budget.jsx";

function App() {
  const [exps, setExps] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const addExpense = (newExp) => {
    setExps((prevExps) => [...prevExps, newExp]);
    setExpenseToEdit(null); // Reset edit state
  };

  const updateExpense = (updatedExp) => {
    setExps((prevExps) =>
      prevExps.map((exp, index) =>
        index === expenseToEdit.index ? updatedExp : exp
      )
    );
    setExpenseToEdit(null); // Reset edit state
  };

  const deleteExpense = (id) => {
    setExps((prevExps) => prevExps.filter((_, index) => index !== id));
  };

  const handleEdit = (index) => {
    setExpenseToEdit({
      ...exps[index],
      index
    });
  };

  return (
    <div className="container">
      <Header />
      <Detail exps={exps} onDelete={deleteExpense} onEdit={handleEdit} />
      <Expense onAdd={addExpense} expenseToEdit={expenseToEdit} onUpdate={updateExpense} />
      <Image />
      <Budget />
    </div>
  );
}

export default App;
