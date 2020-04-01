<template>
  <div class="record_container">
    <NavigationTopVue :background="'white'">
      <span slot="middle">约课记录</span>
    </NavigationTopVue>
    <van-tabs
      v-model="active"
      title-active-color="#EB6100"
      line-width="20px"
      color="#EB6100"
      @click="click"
    >
      <van-tab title="待上课">
        内容 1
        <div class="empty_div">
          <img class="empty_img" src="https://wap.365msmk.com/img/no-message.8d3ca5af.png" alt />
          <p class="msg">请登录后查看相关内容</p>
          <van-button type="default" class="login_btn">登录/注册</van-button>
        </div>
      </van-tab>
      <van-tab title="已上课">
        内容 2
        <div class="empty_div">
          <img class="empty_img" src="https://wap.365msmk.com/img/no-message.8d3ca5af.png" alt />
          <p class="msg">请登录后查看相关内容</p>
          <van-button type="default" class="login_btn">登录/注册</van-button>
        </div>
      </van-tab>
      <van-tab title="已取消">
        内容 3
        <div class="empty_div">
          <img class="empty_img" src="https://wap.365msmk.com/img/no-message.8d3ca5af.png" alt />
          <p class="msg">请登录后查看相关内容</p>
          <van-button type="default" class="login_btn" @click="toLogin">登录/注册</van-button>
        </div>
      </van-tab>
    </van-tabs>
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
      active: 2
    };
  },
  methods: {
    click(name, title) {
      console.log(name, title);
    },
    toLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.record_container {
  width: 100%;
  font-size: 16px;
  padding-top: 46px;
}
.addClass {
  color: orange;
}
.empty_div {
  text-align: center;
  padding-top: 100px;
}
.msg {
  color: gray;
  margin: 20px 0px;
}
.empty_img {
  width: 50%;
  margin: 0 auto;
}
.login_btn {
  background-color: #eb6100;
  color: white;
  margin: 0 auto;
  display: block;
}
</style>