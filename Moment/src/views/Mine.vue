<template>
  <div class="mine_container">
    <MineHeaderVue />
    <MineShareVue />
    <MineListVue />
    <van-button @click="remove" type="primary">退出登录</van-button>
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
  methods: {
    remove() {
      window.localStorage.removeItem("user_id");
      window.localStorage.removeItem("adminToken");
      this.$router.push("/index");
    }
  }
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