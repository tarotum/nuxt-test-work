<template>
  <section class="container">
    <div class="budget-info">
      <h1 class="title">{{budget.name}} budget</h1>
      <p>Total: {{budget.sum}} {{budget.currency}}</p>
      <p>Left: {{budgetLeft}} {{budget.currency}}</p>
    </div>
    <div class="add-transaction-wrapper">
      <button
        type="button"
        @click="() => showModal = true"
        class="add-transaction"
        :disabled="limit"
      >Add transaction</button>
    </div>
    <nuxt-link class="back-link" to="/budgets">Back</nuxt-link>
    <div v-if="showModal" class="modal">
      <div class="modal-wrapper">
        <button type="button" @click="() => showModal = false" class="close-modal">&times;</button>
        <Form @send="addTransaction"/>
      </div>
    </div>
    <ListTransact :list="transactions"/>
  </section>
</template>

<script>
import axios from "axios";
import { Decimal } from "decimal.js";
import currencyList from "../../utils/currencyList";

import Form from "~/components/Form.vue";
import ListTransact from "~/components/ListTransact.vue";
export default {
  components: {
    Form,
    ListTransact
  },
  asyncData(context) {
    return {
      showModal: false,
      id: context.params.id,
      interval: null,
      rates: {},
      budget: {
        name: "",
        sum: 0,
        currency: "",
        transactions: []
      }
    };
  },
  created() {
    if (process.browser) {
      this.$store.dispatch("budgets/GET_BUDGET_BY_ID", this.id);
      if (this.$store.state.budgets.budget) {
        this.budget = this.$store.state.budgets.budget;
        this.fetchRates();
        this.interval = setInterval(() => this.fetchRates(), 30000);
      } else {
        this.$router.push("/");
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.interval);
    this.$store.commit("budgets/CLEAR_BUDGET");
  },
  computed: {
    transactions() {
      return this.$store.state.budgets.budget
        ? this.$store.state.budgets.budget.transactions
        : [];
    },
    budgetLeft() {
      if (process.browser && this.transactions) {
        const budgetSum = new Decimal(this.budget.sum);
        const rates = this.getRates;

        const transactionsSum = this.transactions.reduce(
          (total, { sum, currency }) => {
            return new Decimal(sum / rates[currency]).plus(total).toFixed(2);
          },
          0
        );
        return budgetSum.minus(transactionsSum).toFixed(2);
      } else {
        return 0;
      }
    },
    limit() {
      return this.budgetLeft <= 0 ? true : false;
    },
    getRates() {
      return this.rates;
    }
  },
  methods: {
    addTransaction(transaction) {
      this.$store.dispatch("budgets/ADD_BUDGET_TRANSACT", {
        budget_id: this.id,
        transaction
      });
    },

    async fetchRates() {
      if (currencyList.includes(this.budget.currency)) {
        const currencies = currencyList.join();
        try {
          const { data: rates } = await axios.get(
            `https://api.exchangeratesapi.io/latest?base=${
              this.budget.currency
            }&symbols=${currencies}`
          );
          this.rates = rates.rates;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style>
.container {
  max-width: 1170px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
}
.budget-info {
  color: #222;
}
.title {
  font-size: 2.5em;
}
.back-link {
  margin-top: 1em;
  display: block;
  font-size: 1.3em;
  color: #222;
}

.add-transaction-wrapper {
  border: 1px solid #222;
  padding: 1em;
  border-radius: 0.3em;
  margin-top: 2em;
}
button.add-transaction {
  background-color: #222;
  color: #fff;
  border: none;
  font-size: 1.3em;
  padding: 0.5em 1em;
  cursor: pointer;
}
button.add-transaction:disabled {
  background-color: #666;
  cursor: not-allowed;
}
</style>

