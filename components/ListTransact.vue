<template>
  <ul class="list">
    <ListTransactItem v-for="item in list" :key="item.id" :item="item"/>
  </ul>
</template>
<script>
import ListTransactItem from "~/components/ListTransactItem.vue";
export default {
  name: "ListTransact",
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  components: {
    ListTransactItem
  }
};
</script>
<style scoped>
.list {
  list-style: none;
  margin: 0;
  margin-top: 2em;
  padding: 0;
}

.list li {
  margin-bottom: 1.5em;
}
.list li:last-child {
  margin-bottom: 0;
}
</style>
