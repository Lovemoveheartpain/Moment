<template>
  <div>
    我的
    <van-button class="btn" @click="remove" type="primary" size="large">退出登录</van-button>
  </div>
</template>

<script>
export default {
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
.btn {
  position: fixed;
  bottom: 0px;
  left: 0px;
}
</style>