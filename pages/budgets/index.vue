<template>
  <section class="container">
    <h1 class="title">All budgets</h1>
    <div class="add-budget-wrapper">
      <button type="button" @click="() => showModal = true" class="add-budget">Add budget</button>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-wrapper">
        <button type="button" @click="() => showModal = false" class="close-modal">&times;</button>
        <Form @send="addBudget"/>
      </div>
    </div>

    <List :list="budgets"/>
  </section>
</template>

<script>
import Form from "~/components/Form.vue";
import List from "~/components/List.vue";

export default {
  components: {
    Form,
    List
  },
  data() {
    return {
      showModal: false
    };
  },
  created() {
    if (process.browser) {
      this.$store.dispatch("budgets/GET_BUDGETS");
    }
  },
  computed: {
    budgets() {
      return this.$store.state.budgets.list;
    }
  },
  methods: {
    addBudget(budget) {
      this.$store.dispatch("budgets/ADD_BUDGET", budget);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1170px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
}
.title {
  font-size: 2.5em;
  margin-bottom: 1em;
}
.add-budget-wrapper {
  border: 1px solid #222;
  padding: 1em;
  border-radius: 0.3em;
  margin-top: 2em;
}
button.add-budget {
  background: #222;
  color: #fff;
  border: none;
  font-size: 1.3em;
  padding: 0.5em 1em;
  cursor: pointer;
}
</style>

