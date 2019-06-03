<template>
  <form class="form" @submit.prevent="send">
    <input type="text" name="name" v-model="name" placeholder="Name">
    <select name="currency" v-model="currency" aria-placeholder="currency">
      <option value disabled selected>Select your currency</option>
      <option
        v-for="(currency, index) in currencyOptions"
        :key="index"
        :value="currency"
      >{{currency}}</option>
    </select>
    <input type="number" name="sum" v-model="sum" placeholder="Sum">
    <button type="submit" class="add-new-budget">Add</button>
  </form>
</template>
<script>
import { mapMutations } from "vuex";
import currencyList from "../utils/currencyList";
export default {
  name: "Form",
  data() {
    return {
      name: "",
      currency: "",
      sum: 0,
      currencyOptions: currencyList
    };
  },
  methods: {
    send() {
      const obj = {
        name: this.name,
        currency: this.currency,
        sum: this.sum
      };
      this.name = "";
      this.currency = "";
      this.sum = 0;
      this.$emit("send", obj);
    }
  }
};
</script>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
.form > * {
  margin-bottom: 1em;
  font-size: 1.3em;
}
.form > *:last-child {
  margin-bottom: 0;
}
.form button {
  cursor: pointer;
}
</style>

