<template>
  <div>
    <div
      class="message_btn"
      v-show="isShow"
      @touchstart="down"
      @touchmove.prevent="move"
      @touchend="end"
      @click="change"
      :style="{bottom:position.y+'px', right:position.x+'px'}"
    >
      <van-icon name="chat" style="z-index: -1;" />
    </div>
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
// 鼠标位置和div的左上角位置 差值
var dx, dy;

export default {
  data() {
    return {
      isShow: true,
      phone: "",
      text: "",
      flags: false,
      position: {
        x: 15,
        y: 80
      },
      screenWidth: window.screen.width,
      screenHeight: window.screen.height
    };
  },
  methods: {
    // 实现移动端拖拽
    down(event) {
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      dx = touch.clientX - event.target.offsetLeft;
      dy = touch.clientY - event.target.offsetTop;
    },
    move(event) {
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.position.x =
          this.screenWidth - (touch.clientX - dx + event.target.offsetWidth);
        this.position.y =
          this.screenHeight - (touch.clientY - dy + event.target.offsetHeight);
        // 限制滑块超出页面
        if (this.position.x < 0) {
          this.position.x = 0;
        } else if (
          this.position.x >
          this.screenWidth - touch.target.clientWidth
        ) {
          this.position.x = this.screenWidth - touch.target.clientWidth;
        }
        if (this.position.y < 0) {
          this.position.y = 0;
        } else if (
          this.position.y >
          this.screenHeight - touch.target.clientHeight
        ) {
          this.position.y = this.screenHeight - touch.target.clientHeight;
        }
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
    },
    change() {
      this.isShow = !this.isShow;
      this.$emit("changeShow");
    },
    submit() {
      if (!this.phone) {
        Toast("请至少填写一项联系方式");
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
.message_btn {
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  position: fixed;
  border-radius: 50%;
  z-index: 50;
  background: #007aff;
  color: white;
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