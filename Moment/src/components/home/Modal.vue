<template>
  <van-overlay :show="isShow">
    <div class="wrapper">
      <div>
        <van-icon name="cross" class="icon_cross" @click="change" />
        <img class="login_img" src="https://wap.365msmk.com/img/feiji.decaf161.png" alt />
        <p class="text1">赶紧登录一下吧</p>
        <p class="text2">立即预约一对一辅导，浏览更多视频课程~</p>
      </div>
      <van-button class="login_btn" @click="toLogin" round type="info">立即登录</van-button>
    </div>
  </van-overlay>
</template>

<script>
export default {
  props: {
    isShow: Boolean
  },
  methods: {
    change() {
      this.$emit("changeShow");
    },
    toLogin(){
        this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 280px;
  height: 350px;
  background: white;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  margin-left: -130px;
  top: 50%;
  margin-top: -200px;
  text-align: center;
}
.icon_cross {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
}
.login_img {
  width: 100%;
  height: 200px;
  margin-top: 10px;
}
.text1 {
  font-size: 16px;
  margin: 10px 0px;
}
.text2 {
  color: gray;
  margin: 10px 0px;
}
.login_btn {
  width: 240px;
  display: block;
  margin: 0 auto;
  background: #eb6100;
  border: none;
}
</style>