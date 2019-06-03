<template>
  <ul class="list">
    <ListItem v-for="item in list" :key="item.id" :item="item"/>
  </ul>
</template>
<script>
import ListItem from "~/components/ListItem.vue";
export default {
  name: "List",
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  components: {
    ListItem
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
