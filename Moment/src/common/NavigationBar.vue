<template>
  <van-tabbar route active-color="#FF6B00" inactive-color="gray" :z-index="15" >
    <van-tabbar-item replace to="/index" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/course" icon="column">课程</van-tabbar-item>
    <van-tabbar-item replace to="/record" icon="todo-list">约课记录</van-tabbar-item>
    <van-tabbar-item replace to="/practice" icon="card">练习</van-tabbar-item>
    <van-tabbar-item replace to="/mine" icon="friends">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  methods: {

  },
  mounted() {
    
  }
};
</script>

<style scoped>
</style>