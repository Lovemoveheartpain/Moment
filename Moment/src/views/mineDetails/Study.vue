<template>
  <div class="my_study_container">
    <div>
      <NavigationTopVue :background="'white'">
        <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
        <span class="teal" slot="middle">我的学习</span>
      </NavigationTopVue>
      <van-tabs
        v-model="active"
        title-active-color="#EB6100"
        line-width="30px"
        color="#EB6100"
        @change="change"
      >
        <van-tab v-for="(item,index) in list" :title="item.name+  `(${item.num})`" :key="index">
          <div class="study_wai_box" v-show="!isShow">
            <div
              class="study_nei_box"
              v-for="(item, index) in courseList"
              :key="index"
              @click="toNext(item)"
            >
              <p>{{item.title}}</p>
              <p class="time_box">
                <van-icon name="clock-o" />
                {{item.start_play_date | fomartTime('MM月dd日 hh:mm')}}~
                {{item.end_play_date | fomartTime('MM月dd日 hh:mm')}} | 共{{item.section_num}}课时
              </p>
              <div class="study_box_bottom">
                <div class="progress_box">
                  <span :style="{width:item.course_id+'%'}"></span>
                </div>
                已学习{{item.course_id}}%
              </div>
            </div>
          </div>
          <emptyVue v-show="isShow">
            <span slot="msg">还没有课程，快去选择课程学习吧</span>
          </emptyVue>
          <van-button
            v-show="isShow"
            class="select_btn"
            color="#EB6100"
            type="primary"
            size="small"
            @click="toCourse"
          >选择课程</van-button>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavigationTopVue from "../../common/NavigationTop.vue";
import { bus } from "../../network";
import emptyVue from "../../common/empty.vue";

export default {
  components: {
    NavigationTopVue,
    emptyVue
  },
  data() {
    return {
      type: 2,
      list: [],
      active: 0,
      courseList: [],
      isShow: false
    };
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    change(num) {
      this.type = this.list[num].type;
      this.getStudy();
    },
    toCourse() {
      this.$router.push("/course");
    },
    toNext(item) {
      this.$router.push("/study-detail?course_id=" + item.course_id);
    },
    getStudy() {
      bus
        .myStudy(this.type)
        .then(res => {
          if (res.data.code == 200) {
            this.list = res.data.data.typeNum;
            this.courseList = res.data.data.courseList;
            if (this.courseList.length == 0) {
              this.isShow = true;
            } else {
              this.isShow = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getStudy();
  },
  activated() {
    this.getStudy();
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

.my_study_container {
  font-size: 14px;
  min-height: 100vh;
  background-color: white;
}
.my_study_container>div {
  padding-top: 46px;
}
.study_wai_box {
  width: 90%;
  padding-left: 5%;
  padding-right: 5%;
}
.select_btn {
  display: block;
  margin: 20px auto;
}
.study_nei_box {
  width: 90%;
  height: 100px;
  border-radius: 5px;
  box-shadow: 0 0 2vw rgba(0, 0, 0, 0.1);
  margin: 10px auto;
  padding: 5%;
}
.study_box_bottom {
  font-size: 12px;
  color: gray;
  display: inline-flex;
  width: 100%;
  align-items: center;
}

.progress_box {
  width: 100px;
  height: 5px;
  background-color: gray;
  margin-right: 15px;
}
.progress_box > span {
  height: 5px;
  background: orangered;
  display: block;
}
.time_box {
  margin: 20px 0px;
  font-size: 12px;
  color: gray;
}
</style>