import React, { useState, useEffect } from "react";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

function Expense({ onAdd, expenseToEdit, onUpdate }) {
  const [isExpanded, setExpanded] = useState(false);
  const [isDefaultCategory, setDefaultCategory] = useState(true);
  const [exp, setExp] = useState({
    title: "",
    newTitle: "",
    amount: "",
    date: "",
    description: ""
  });

  useEffect(() => {
    if (expenseToEdit) {
      setExp(expenseToEdit);
      setExpanded(true);
    } else {
      setExp({
        title: "",
        newTitle: "",
        amount: "",
        date: "",
        description: ""
      });
      setExpanded(false);
    }
  }, [expenseToEdit]);

  const isWhitespaceString = (str) => !str.replace(/\s/g, "").length;

  const handleChange = ({ target: { name, value } }) => {
    if (name === "title") {
      setDefaultCategory(value !== "Other");
    }

    setExp((prevExp) => ({
      ...prevExp,
      [name]: value
    }));
  };

  const submitExp = (event) => {
    event.preventDefault();
    if (
      ((exp.title !== "" && exp.title !== "Other") || (exp.title === "Other" && !isWhitespaceString(exp.newTitle))) &&
      Number(exp.amount) !== 0 &&
      exp.date !== ""
    ) {
      if (expenseToEdit) {
        onUpdate(exp);
      } else {
        onAdd(exp);
      }
      setExp({
        title: "",
        newTitle: "",
        amount: "",
        date: "",
        description: ""
      });
      setDefaultCategory(true);
      setExpanded(false);
    } else {
      alert("Please enter required fields");
    }
  };

  const expand = () => setExpanded(true);

  return (
    <div className="section add-expense">
      <h3>{expenseToEdit ? "Edit Expense" : "Add Expense"}</h3>
      <form onSubmit={submitExp}>
        <select
          name="title"
          onClick={expand}
          onChange={handleChange}
          value={exp.title}
          required
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Groceries">Groceries</option>
          <option value="Other">Other</option>
        </select>
        {!isDefaultCategory && (
          <input
            name="newTitle"
            type="text"
            onClick={expand}
            placeholder="Expense Category"
            onChange={handleChange}
            value={exp.newTitle}
            required
          />
        )}
        <input
          name="amount"
          type="number"
          onClick={expand}
          placeholder="Expense amount ($)"
          onChange={handleChange}
          value={exp.amount}
          required
        />
        <input
          name="date"
          type="date"
          onClick={expand}
          placeholder="Date"
          onChange={handleChange}
          value={exp.date}
          required
        />
        {isExpanded && (
          <textarea
            name="description"
            placeholder="Description of expense (optional)"
            onChange={handleChange}
            value={exp.description}
            rows={3}
          />
        )}
        <Zoom in={isExpanded}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default Expense;
