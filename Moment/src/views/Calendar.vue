<template>
  <div class="calender_container">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span slot="middle">学习日历</span>
    </NavigationTopVue>
    <van-calendar
      title="日历"
      @select="select"
      :poppable="false"
      :show-confirm="false"
      :style="{ height: '440px' }"
    />
    {{realyTime}}
  </div>
</template>

<script>
import NavigationTopVue from "../common/NavigationTop.vue";

export default {
  components: {
    NavigationTopVue
  },
  data() {
    return {
      time: new Date()
    };
  },
  computed: {
    realyTime() {
      const d = new Date(this.time);
      return d.getMonth() + 1 + "月" + d.getDate() + "日";
    }
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    select(date) {
      this.time = date;
    }
  }
};
</script>

<style  scoped>
.calender_container {
  width: 100%;
  font-size: 16px;
}
.fan_icon {
  color: gray;
  font-size: 20px;
}
</style>