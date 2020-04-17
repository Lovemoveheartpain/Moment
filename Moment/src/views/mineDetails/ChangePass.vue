<template>
  <div class="change_password_container">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">设置密码</span>
    </NavigationTopVue>
    <div class="password_box">
      <div class="input_box verification_box" :class="flag1?'activeClass':'defaultClass'">
        <input
          type="number"
          v-model="form.mobile"
          placeholder="请输入手机号"
          maxlength="4"
          @focus="flag1=true"
          @blur="flag1 = false"
        />
        <span @click="get_verification" :style="{color: isShow?'gray':'#ff8e43'}">
          获取验证码
          <van-count-down
            v-show="isShow"
            ref="countDown"
            class="count_down"
            :time="60*1000"
            :auto-start="false"
            format="ss"
            @finish="finish"
          />
        </span>
      </div>
      <div class="input_box" :class="flag2?'activeClass':'defaultClass'">
        <input
          type="number"
          v-model="form.sms_code"
          placeholder="请输入验证码"
          @focus="flag2=true"
          @blur="flag2 = false"
        />
      </div>
      <div class="input_box" :class="flag3?'activeClass':'defaultClass'">
        <input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          @focus="flag3=true"
          @blur="flag3 = false"
        />
      </div>
      <van-button round class="login_btn" block type="default" @click="sure">确认</van-button>
    </div>
  </div>
</template>

<script>
import NavigationTopVue from "../../common/NavigationTop.vue";
import { Toast } from "vant";
import { bus } from "../../network";
export default {
  components: {
    NavigationTopVue
  },

  data() {
    return {
      flag1: false,
      flag2: false,
      flag3: false,
      form: {
        mobile: "",
        sms_code: "",
        password: ""
      },
      isShow: false
    };
  },
  methods: {
    get_verification() {
      var testTeam = /^[1][3|4|5|6|7|8|9][0-9]{9}$/;
      if (testTeam.test(this.form.mobile)) {
        if (!this.isShow) {
          bus
            .smsCode({ mobile: this.form.mobile, sms_type: "login" })
            .then(res => {
              if (res.data.code == 200) {
                Toast.success("验证码已发送!");
                this.isShow = true;
                this.start();
              } else if (res.data.code == 201) {
                Toast.fail(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        Toast("手机号码格式不正确 !");
      }
    },
    sure() {
      if (this.form.password) {
        bus
          .change_password(this.form)
          .then(res => {
            if (res.data.code == 200) {
              Toast.success("设置成功!");
              this.$router.push("/options");
            } else if (res.data.code == 201) {
              Toast.fail(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Toast.fail("密码不能为空");
      }
    },
    start() {
      this.$refs.countDown.start();
    },
    reset() {
      this.$refs.countDown.reset();
    },
    finish() {
      this.reset();
      this.isShow = false;
    },
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
.change_password_container {
  padding-top: 46px;
  height: 100vh;
  background-color: white;
  font-size: 16px;
}

.password_box {
  width: 90%;
  margin: 0 auto;
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
.verification_box > input {
  width: 60%;
}
.verification_box > span {
  float: right;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
}
.verification_box > span > div {
  font-size: 12px;
}
.count_down {
  float: right;
}
.login_btn {
  background-color: #ff8e43;
  width: 90%;
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