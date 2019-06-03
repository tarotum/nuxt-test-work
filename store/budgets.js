import data from "../utils/data";

const defaultBudget = {
  name: "",
  currency: "",
  sum: 0,
  transactions: []
};

export const state = () => ({
  list: [],
  budget: defaultBudget
});

export const mutations = {
  // Budgets store mutations
  SET_BUDGETS(state, budgets) {
    state.list = budgets;
  },
  SET_BUDGET(state, budget) {
    state.budget = budget;
  },
  ADD(state, budget) {
    state.list = [...state.list, budget];
  },
  EDIT(state, { id, sum, transactions }) {
    const editingBudget = state.list.find(budget => id === budget.id);
    editingBudget.transactions = transactions;
    editingBudget.sum = sum;
    if (process.browser) {
      data.save("budgets", state.list);
    }
  },
  REMOVE(state, id) {
    state.list = state.list.filter(budget => id !== budget.id);
  },
  CLEAR_BUDGET(state) {
    state.budget = defaultBudget;
  },
  // Transactions store mutations
  ADD_TRANSACT(state, { budget_id, transaction }) {
    if (state.budget.id === budget_id) {
      if (state.budget.transactions) {
        state.budget.transactions = [...state.budget.transactions, transaction];
      } else {
        state.budget.transactions = [transaction];
      }
    }
  },
  REMOVE_TRANSACT(state, { budget_id, transaction_id }) {
    if (state.budget.id === budget_id) {
      state.budget.transactions = state.budget.transactions.filter(
        budget => transaction_id !== budget.id
      );
    }
  }
};

export const actions = {
  GET_BUDGETS({ commit }) {
    if (process.browser) {
      const budgets = data.getBudgets();
      commit("SET_BUDGETS", budgets);
    }
  },
  GET_BUDGET_BY_ID({ commit }, payload) {
    if (process.browser) {
      const budget = data.getBudgetById(payload);
      commit("SET_BUDGET", budget);
    }
  },
  ADD_BUDGET({ commit }, payload) {
    data.addNewBudget(payload);
    commit("ADD", payload);
  },
  REMOVE_BUDGET({ commit }, payload) {
    data.removeBudget(payload);
    commit("REMOVE", payload);
  },
  ADD_BUDGET_TRANSACT({ commit }, { budget_id, transaction }) {
    data.addNewTransaction(budget_id, transaction);

    commit("ADD_TRANSACT", { budget_id, transaction });
  },
  REMOVE_BUDGET_TRANSACT({ commit, state }, transaction_id) {
    const budget_id = state.budget.id;

    data.removeTransaction(budget_id, transaction_id);

    commit("REMOVE_TRANSACT", { budget_id, transaction_id });
  }
};
