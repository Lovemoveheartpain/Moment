<template>
  <div class="concern_container">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">我的关注</span>
    </NavigationTopVue>
    <van-list
      class="oto_for_box"
      v-show="!isShow"
      v-model="loading"
      :finished="finished"
      :offset="1"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        class="oto_content"
        @click="change(item.teacher_id)"
      >
        <div class="oto_content_left">
          <img :src="item.avatar" alt />
        </div>
        <div class="oc_item">
          <p>
            <span>{{item.teacher_name}}</span>
            <span class="level_name">{{item.level_name}}</span>
          </p>
          <p>{{item.introduction}}</p>
        </div>
        <div class="oc_right">
          <span class="oc_btn" @click.stop="cancel(item.collect_id)">取消关注</span>
        </div>
      </div>
    </van-list>
    <div class="discuss_container" v-show="isShow" >
      <img class="empty_img" src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt />
      <p class="empty_text">暂无关注</p>
    </div>
  </div>
</template>

<script>
import NavigationTopVue from "../../common/NavigationTop.vue";
import { bus } from "../../network";
import { Toast } from "vant";

export default {
  name: "concern",
  components: {
    NavigationTopVue
  },
  data() {
    return {
      form: {
        page: 0,
        limit: 10,
        type: 2
      },
      loading: false,
      finished: false,
      list: [],
      total: 0,
      isShow: false
    };
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    cancel(id) {
      bus
        .cancel_collectTeacher(id)
        .then(res => {
          if (res.data.code == 200) {
            Toast.success("取消收藏成功!");
            this.form.page = 0;
            this.list = [];
            this.onLoad();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    change(id) {
      this.$router.push("/teacher?id=" + id);
    },
    onLoad() {
      this.form.page++;
      setTimeout(() => {
        bus.collectTeacher(this.form).then(res => {
          if (res.data.code == 200) {
            this.list = [...this.list, ...res.data.data.list];
            console.log(this.list);
            if (this.list.length == 0) {
              this.isShow = true;
            } else {
              this.isShow = false;
            }
            this.total = res.data.data.total;
            this.loading = false;
            if (this.list.length >= this.total) {
              this.finished = true;
            }
          }
        });
      }, 1000);
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

.concern_container {
  padding-top: 45px;
  font-size: 16px;
}
.oto_for_box {
  padding-left: 3%;
  padding-right: 3%;
}
.oto_content {
  width: 94%;
  height: 50px;
  padding: 3%;
  background-color: white;
  border-radius: 5px;
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
}
.oto_content_left {
  width: 15%;
  /* background: pink; */
  display: inline-flex;
  align-items: center;
}
.oto_content_left > img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.oc_item {
  width: 55%;
  height: 60px;
  /* background: rosybrown; */
  display: inline-flex;
  flex-wrap: wrap;
  align-content: center;
}
.oc_item > p {
  width: 100%;
  height: 25px;
  line-height: 25px;
  /* background: red; */
}
.oc_item :nth-child(2) {
  font-size: 12px;
  color: lightgray;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.oc_item > p > .level_name {
  color: darkorange;
  font-size: 12px;
  margin-left: 5px;
}

.oc_right {
  width: 30%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.oc_btn {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  color: orangered;
  background-color: #fdefe5;
}
.discuss_container {
  margin-top: 100px;
  text-align: center;
}
.empty_text {
  font-size: 16px;
  color: lightgray;
  margin-top: 15px;
}
.empty_img {
  width: 150px;
  height: 150px;
}
</style>