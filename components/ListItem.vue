<template>
  <li class="item">
    <h3>{{item.name}} {{item.sum + ' ' + item.currency}}</h3>
    <nuxt-link :to="/budgets/ + item.id">View Details</nuxt-link>
    <button class="button-remove" @click="removeBudget($event, item.id)">&times;</button>
  </li>
</template>
<script>
export default {
  name: "ListItem",
  props: {
    item: Object,
    required: true
  },
  methods: {
    removeBudget($event, id) {
      if (confirm("Do you really want to delete a budget?"))
        this.$store.dispatch("budgets/REMOVE_BUDGET", id);
    }
  }
};
</script>
<style scoped>
.item {
  background-color: #eaeaea;

  padding: 1em;
  border-radius: 0.3em;
  display: flex;
  justify-content: space-between;
}
.item h3 {
  line-height: 1;
  color: #222;
}
.item h3 span {
  color: #444;
  font-weight: normal;
}
.item .button-remove {
  font-weight: bold;
  font-size: 1.5em;
  line-height: 1;
  background: transparent;
  border: none;
  cursor: pointer;
}
.item .button-remove:hover {
  color: red;
}
</style>
