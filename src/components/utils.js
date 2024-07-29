export const groupExpensesByCategory = (expenses) => {
    return expenses.reduce((acc, exp) => {
      const category = exp.title === "Other" ? exp.newTitle : exp.title;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(exp);
      return acc;
    }, {});
  };
  