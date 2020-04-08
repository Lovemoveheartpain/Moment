<template>
  <div>
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">我的关注</span>
    </NavigationTopVue>
  </div>
</template>

<script>
import NavigationTopVue from "../../common/NavigationTop.vue";

export default {
  components: {
    NavigationTopVue
  },
  methods: {
    fan() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.teal {
  font-size: 18px;
  color: gray;
}
.fan_icon {
  color: gray;
  font-size: 20px;
}
</style>