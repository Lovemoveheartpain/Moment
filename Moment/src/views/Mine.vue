<template>
  <div class="mine_container">
    <MineHeaderVue />
    <MineShareVue />
    <MineListVue />
  </div>
</template>

<script>
import MineHeaderVue from "../components/mine/MineHeader.vue";
import MineShareVue from "../components/mine/MineShare.vue";
import MineListVue from "../components/mine/MineList.vue";
export default {
  components: {
    MineHeaderVue,
    MineShareVue,
    MineListVue
  },
};
</script>

<style scoped>
.mine_container {
  background-color: white;
  width: 100%;
  font-size: 12px;
  margin-bottom: 80px;
}
</style>