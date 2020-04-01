<template>
  <div class="teacher_container">
    <header class="header_top" :background="'#60AFFA'">
      <NavigationTopVue>
        <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
        <span slot="middle" style="color:white">讲师详情</span>
      </NavigationTopVue>
    </header>
    <div class="teach_details_box">
      <OtoTeacherVue :list="teacherList.teacher" />
    </div>
    <div class="tab_container">
      <van-tabs v-model="active" title-active-color="#EB6100" line-width="20px" color="#EB6100">
        <van-tab title="讲师介绍">
          <div class="tab_box">
            <div class="teacher_details_content">
              <div v-for="(item, index) in teacherInfoList.attr" :key="index">
                <span>{{item.attr_name}}</span>
                <p>{{item.attr_value[0].attr_value_name}}</p>
              </div>
              <div>
                <span>老师简介</span>
                <p>{{teacherInfoList.intro}}</p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="主讲课程">
          <div class="tab_box"></div>
        </van-tab>
        <van-tab title="学员评价">
          <div class="tab_box">
            <div class="discuss_container">
              <img class="empty_img" src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt />
              <p class="empty_text">暂无评论</p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-button type="default" class="reserve_btn" size="large" @click="toDetails">立即预约</van-button>
  </div>
</template>

<script>
import { bus } from "../network";
import NavigationTopVue from "../common/NavigationTop.vue";
import OtoTeacherVue from "../components/oto/OtoTeacher.vue";

export default {
  components: {
    NavigationTopVue,
    OtoTeacherVue
  },
  data() {
    return {
      id: this.$route.query.id,
      teacherList: { teacher: {}, flag: "" },
      teacherInfoList: { attr: [], intro: "" },
      active: 0
    };
  },
  methods: {
    toDetails() {
      this.$router.push("/oto_plan?id=" + this.id);
    },
    fan() {
      this.$router.go(-1);
    },
    getTeacher() {
      bus
        .getTeacher(this.id)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.teacherList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTeacherInfo() {
      bus
        .getTeacherInfo(this.id)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.teacherInfoList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  activated() {
    this.id = this.$route.query.id;
    this.getTeacher();
    this.getTeacherInfo();
  }
};
</script>

<style scoped>
.teacher_container {
  width: 100%;
  font-size: 16px;
}
.fan_icon {
  color: white;
  font-size: 20px;
}
.header_top {
  width: 100%;
  height: 100px;
  background-color: #5facf9;
}
.reserve_btn {
  position: fixed;
  bottom: 0;
  background-color: #eb6100;
  color: white;
}
.teach_details_box {
  width: 94%;
  padding-left: 3%;
  padding-right: 3%;
  position: absolute;
  top: 40px;
}
.tab_box {
  width: 100%;
  background-color: white;
  border-top: 1px solid lightgray;
}
.empty_img {
  width: 150px;
  height: 150px;
}

.discuss_container {
  text-align: center;
  padding: 10px 0;
}
.empty_text {
  font-size: 16px;
  color: lightgray;
  margin-top: 15px;
}
.tab_container {
  position: absolute;
  top: 150px;
  width: 100%;
}

.teacher_details_content > div {
  width: 90%;
  padding: 15px 5%;
  /* background: red; */
  color: gray;
  display: inline-flex;
}
.teacher_details_content > div > span {
  font-size: 12px;
  display: inline-flex;
  width: 20%;
  /* background: pink; */
}
.teacher_details_content > div > p {
  font-size: 12px;
  width: 80%;
  /* background: pink; */
}
</style>