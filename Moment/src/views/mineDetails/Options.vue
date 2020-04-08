<template>
  <div class="options_container">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">设置</span>
    </NavigationTopVue>
    <div class="options_box">
      <ul class="top">
        <li @click="toPass" >
          <span>设置密码</span>
          <van-icon class="fan_icon" name="arrow" @click="fan" />
        </li>
      </ul>

      <van-button class="bottom_btn" @click="remove" type="primary">退出登录</van-button>
    </div>
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
    },
    toPass(){
      this.$router.push('/changePass')
    },
    remove() {
      window.localStorage.removeItem("user_id");
      window.localStorage.removeItem("adminToken");
      this.$router.push("/index");
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

.options_container {
  padding-top: 60px;
  font-size: 16px;
}
.top > li {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}
.options_box {
  padding: 5%;
  background-color: white;
}
.bottom_btn {
  background-color: #eb6100;
  width: 100%;
  border: none;
  display: block;
  margin: 40px auto;
}
</style>