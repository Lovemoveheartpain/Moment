<template>
  <div class="feedback_container">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">意见反馈</span>
    </NavigationTopVue>
    <van-field
      v-model="content"
      rows="5"
      autosize
      type="textarea"
      maxlength="300"
      placeholder="请输入您的意见"
      show-word-limit
    />
    <van-button type="primary" class="submit_btn" @click="feedback">提交</van-button>
  </div>
</template>

<script>
import NavigationTopVue from "../../common/NavigationTop.vue";
import { bus } from "../../network";
import { Toast } from "vant";
export default {
  components: {
    NavigationTopVue
  },
  data() {
    return {
      content: ""
    };
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    feedback() {
      bus
        .feedback({ content: this.content })
        .then(res => {
          if (res.data.code == 201) {
            Toast(res.data.msg);
          } else if (res.data.code == 200) {
            Toast.success("反馈成功");
            this.$router.push("/mine");
          }
        })
        .catch(err => {
          console.log(err);
        });
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

.submit_btn {
  width: 90%;
  background-color: #eb6100;
  display: block;
  margin: 50px auto;
  border: none;
}
.feedback_container {
  padding-top: 60px;
}
</style>