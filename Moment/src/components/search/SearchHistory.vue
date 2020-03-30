<template>
  <div class="search_history_container">
    <h3 class="search_title">
      搜索历史
      <van-icon @click="remove" name="delete" />
    </h3>
    <div class="search_history_div">
      <div v-for="(item, index) in history" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    history() {
      return this.$store.state.history.searchHistory;
    }
  },
  methods: {
    remove() {
      this.$store.commit("removeHistory", []);
    }
  }
};
</script>

<style scoped>
.search_history_container {
  width: 100%;
  padding-top: 70px;
}
.search_title {
  width: 90%;
  padding-left: 5%;
  padding-right: 5%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}
.search_history_div {
  width: 90%;
  display: inline-flex;
  flex-wrap: wrap;
  /* background: red; */
  padding: 2% 5%;
}
.search_history_div > div {
  font-size: 12px;
  border-radius: 11px;
  background-color: lightgrey;
  padding-left: 10px;
  padding-right: 10px;
  height: 22px;
  line-height: 22px;
  min-width: 18px;
  text-align: center;
  margin: 8px 5px;
}
</style>