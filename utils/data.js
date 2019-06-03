import uniqid from "uniqid";

const data = {
  getBudgets: () => JSON.parse(window.localStorage.getItem("budgets")) || [],
  getBudgetById: id => {
    const existingBudgets =
      JSON.parse(window.localStorage.getItem("budgets")) || [];
    return existingBudgets.find(item => id === item.id);
  },
  addNewBudget: budget => {
    if (!budget) return;

    budget.id = uniqid();
    budget.transactions = [];

    const existingBudgets =
      JSON.parse(window.localStorage.getItem("budgets")) || [];
    const budgets = [...existingBudgets, budget];
    window.localStorage.setItem("budgets", JSON.stringify(budgets));
  },
  removeBudget: id => {
    const existingBudgets =
      JSON.parse(window.localStorage.getItem("budgets")) || [];
    const budgets = existingBudgets.filter(item => id !== item.id);
    window.localStorage.setItem("budgets", JSON.stringify(budgets));
  },
  addNewTransaction: (budget_id, transaction) => {
    if (!transaction) return;

    transaction.id = uniqid();
    const existingBudgets =
      JSON.parse(window.localStorage.getItem("budgets")) || [];
    const currentBudget = existingBudgets.find(item => budget_id === item.id);
    if (currentBudget) {
      if (currentBudget.transactions) {
        currentBudget.transactions = [
          ...currentBudget.transactions,
          transaction
        ];
      } else {
        currentBudget.transactions = [transaction];
      }
      window.localStorage.setItem("budgets", JSON.stringify(existingBudgets));
    } else {
      return;
    }
  },
  removeTransaction: (budget_id, transaction_id) => {
    const existingBudgets =
      JSON.parse(window.localStorage.getItem("budgets")) || [];
    const currentBudget = existingBudgets.find(item => budget_id === item.id);
    if (currentBudget) {
      currentBudget.transactions = currentBudget.transactions.filter(
        item => transaction_id !== item.id
      );
      window.localStorage.setItem("budgets", JSON.stringify(existingBudgets));
    } else {
      return;
    }
  }
};

export default data;
