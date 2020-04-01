<template>
  <div class="login_container">
    <div class="logo_box">
      <img
        class="logo_icon"
        src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019pILfAg7Avr1567732916.png"
        alt
      />
    </div>
    <div class="input_box" :class="flag1?'activeClass':'defaultClass'">
      <input
        type="number"
        v-model="form.mobile"
        placeholder="请输入手机号"
        @focus="flag1=true"
        @blur="flag1 = false"
      />
    </div>
    <div class="input_box" :class="flag2?'activeClass':'defaultClass'">
      <input
        type="password"
        v-model="form.password"
        placeholder="请输入密码"
        name
        id
        @focus="flag2=true"
        @blur="flag2 = false"
      />
    </div>
    <div class="text_box">
      <span>找回密码</span>
      <span style="float: right;">注册/验证码登录</span>
    </div>
    <van-button round class="login_btn" block type="default" @click="login">登录</van-button>
  </div>
</template>

<script>
import { bus } from "../network";
import { Toast } from "vant";
export default {
  data() {
    return {
      flag1: false,
      flag2: false,
      form: {
        mobile: "19937723787",
        password: "",
        type: 1
      }
    };
  },
  methods: {
    login() {
      var testTeam = /^[1][3|4|5|6|7|8|9][0-9]{9}$/;
      if (testTeam.test(this.form.mobile)) {
        bus
          .login(this.form)
          .then(res => {
            if (res.data.code == 200) {
              window.localStorage.setItem("user_id", res.data.data.id);
              window.localStorage.setItem(
                "adminToken",
                res.data.data.remember_token
              );
              Toast("登录成功");
              // this.$router.push("/mine");
              this.$router.push("/index");
            } else if (res.data.code == 201) {
              Toast(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Toast("手机号码格式不正确 !");
      }
    }
  }
};
</script>

<style scoped>
.login_container {
  width: 100vw;
  height: 100vh;
  background-color: white;
  font-size: 16px;
}
.login_container > div {
  width: 80%;
  margin: 0 auto;
}
.logo_box {
  text-align: center;
  padding: 50px 0;
}
.logo_icon {
  width: 80%;
}
.input_box {
  padding: 15px 0;
}
.input_box > input {
  width: 90%;
  border: none;
  outline: none;
}
.login_btn {
  background-color: #ff8e43;
  width: 80%;
  color: white;
  margin: 30px auto;
}
.activeClass {
  border-bottom: 1px solid orange;
}
.defaultClass {
  border-bottom: 1px solid lightgray;
}
.text_box {
  padding: 20px;
  color: gray;
  font-size: 12px;
}
</style>