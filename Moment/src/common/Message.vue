<template>
  <div>
    <van-button round class="message_btn" type="info" v-show="isShow" @click="change">
      <van-icon name="chat" />
    </van-button>
    <div v-show="!isShow" class="message_container">
      <div class="message_container_header">
        <div>
          给我们留言
          <span @click="change">
            <van-icon name="arrow-down" />关闭
          </span>
        </div>
      </div>
      <div class="message_tip">您好，很抱歉我们暂时无法为您提供服务，如需帮助，请留言，我们将尽快联系并解决您的问题</div>
      <div class="message_contant">
        <p>手机</p>
        <div>
          <input type="text" placeholder="请输入" v-model="phone" />
        </div>
        <p>留言内容</p>
        <div>
          <textarea placeholder="请输入" v-model="text" cols="30" rows="3"></textarea>
        </div>
      </div>
      <van-button class="submit_btn" type="info" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      isShow: true,
      phone: "",
      text: ""
    };
  },
  methods: {
    change() {
      this.isShow = !this.isShow;
      this.$emit('changeShow')
    },
    submit() {
      if (!this.phone) {
        Toast("请至少填写一项联系方式");
      }
    }
  }
};
</script>

<style scoped>
.message_btn {
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  position: fixed;
  bottom: 70px;
  right: 15px;
  z-index: 10;
}
.message_btn > span {
  font-size: 25px;
}
.message_container {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  position: absolute;
  top: 0px;
  z-index: 10;
  font-size: 14px;
}
.message_container_header {
  color: white;
  width: 100%;
  height: 60px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #007aff;
}
.message_container_header > div {
  width: 90%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}
.message_tip {
  font-size: 12px;
  color: rgb(102, 102, 102);
  word-break: break-all;
  padding: 16px;
}
.message_contant > p {
  font-size: 12px;
  padding: 8px 16px;
}
.message_contant > div {
  background: white;
  padding: 12px;
}
.message_contant > div > input,
textarea {
  border: none;
  outline: none;
  width: 100%;
  font-size: 13px;
  resize: none;
}
.submit_btn {
  width: 80%;
  display: block;
  margin: 10px auto;
}
</style>