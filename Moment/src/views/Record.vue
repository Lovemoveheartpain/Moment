<template>
  <div class="record_container">
    <NavigationTopVue :background="'white'">
      <span slot="middle">约课记录</span>
    </NavigationTopVue>
    <van-tabs v-model="active" title-active-color="#EB6100" line-width="20px" color="#EB6100">
      <van-tab title="待上课">
        <div class="empty_div">
          <img class="empty_img" src="https://wap.365msmk.com/img/no-message.8d3ca5af.png" alt />
          <p class="msg">{{this.flag?'还没有待上课记录哦':'请登录后查看相关内容' }}{{flag}}</p>
          <van-button
            type="default"
            class="login_btn"
            @click="toLogin"
          >{{this.flag?'立即约课':'登录/注册' }}</van-button>
        </div>
      </van-tab>
      <van-tab title="已上课">
        <div class="empty_div">
          <img class="empty_img" src="https://wap.365msmk.com/img/no-message.8d3ca5af.png" alt />
          <p class="msg">{{this.flag?'还没有上课记录哦':'请登录后查看相关内容' }}</p>
          <van-button
            type="default"
            class="login_btn"
            @click="toLogin"
          >{{this.flag?'立即约课':'登录/注册' }}</van-button>
        </div>
      </van-tab>
      <van-tab title="已取消">
        <div class="empty_div">
          <img class="empty_img" src="https://wap.365msmk.com/img/no-message.8d3ca5af.png" alt />
          <p class="msg">{{this.flag?'还没有取消上课记录哦':'请登录后查看相关内容' }}</p>
          <van-button
            type="default"
            class="login_btn"
            v-show="!flag"
            @click="toLogin"
          >{{this.flag?'立即约课':'登录/注册' }}</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavigationTopVue from "../common/NavigationTop.vue";
export default {
  name: "record",
  components: {
    NavigationTopVue
  },
  data() {
    return {
      active: 0,
      id: window.localStorage.getItem("user_id"),
      token: window.localStorage.getItem("adminToken")
    };
  },
  computed: {
    flag() {
      return this.id != null && this.token != null;
    }
  },
  methods: {
    toLogin() {
      if (this.flag) {
        this.$router.push("/oto");
      } else {
        this.$router.push("/login");
      }
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