<template>
  <div
    class="message_btn"
    v-show="isShow"
    @touchstart="down"
    @touchmove.prevent.capture="move"
    @touchend="end"
    @click="change"
    :style="{bottom:position.y+'px', right:position.x+'px'}"
  >
    <van-icon name="chat" />
  </div>
</template>

<script>
// 鼠标位置和div的左上角位置 差值
var dx, dy;

export default {
  data() {
    return {
      isShow: true,
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
      console.log(111);
      this.$store.commit("changeShow", true);
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
  position: fixed;
  border-radius: 50%;
  background: #007aff;
  color: white;
  z-index: 50;
}
.message_btn > i {
  font-size: 25px;
  z-index: -1;
  margin-top: 25%;
}
</style>