<template>
  <div class="study_details_container">
    <div>
      <NavigationTopVue :background="'white'">
        <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
        <span class="teal" slot="middle">{{course.title}}</span>
        <van-icon name="notes-o" class="fan_icon" slot="right" @click="toCalendar" />
      </NavigationTopVue>
      <div class="class_top">
        <div>共{{course.section_num}}课时</div>
        <div class="middle_top_progress">
          <div>
            <span :style="{width:course.progress_rate+'%'}"></span>
          </div>
        </div>
        <div>已学习{{course.progress_rate}}%</div>
      </div>
      <div>
        <div v-for="(item, index) in periods" :key="index" class="item">{{item.id}}</div>
      </div>
      <div class="study_details_bottom">
        <div v-for="(item, index) in bottom" :key="index" @click="onclick(index)">
          <van-icon :name="item.icon" />
          <span>{{item.text}}</span>
        </div>
      </div>
    </div>
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
      id: this.$route.query.course_id,
      course: { title: "", section_num: "", progress_rate: "" },
      periods: [],
      bottom: [
        { text: "写评论", icon: "edit" },
        { text: "课程详情", icon: "apps-o" },
        { text: "移除列表", icon: "delete" }
      ]
    };
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    toCalendar() {
      this.$router.push("/calendar");
    },
    myStudyCourse() {
      bus
        .myStudyCourse(this.id)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.course = res.data.data.course;
            this.periods = res.data.data.periods;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onclick(key) {
      switch (key) {
        case 0:
          break;
        case 1:
          this.$router.push("/course_details/" + this.id);
          break;
        case 2:
          this.deleteStudyCourse();
          break;
        default:
          break;
      }
    },
    deleteStudyCourse() {
      bus
        .deleteStudyCourse(this.id)
        .then(res => {
          if (res.data.code == 200) {
            Toast.success("删除成功!");
            this.$router.push("/my_study");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.myStudyCourse();
  },
  activated() {
    this.id = this.$route.query.course_id;
    this.myStudyCourse();
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
.study_details_container {
  font-size: 14px;
  min-height: 100vh;
  background-color: white;
}
.study_details_container > div {
  padding-top: 46px;
}
.class_top {
  width: 100%;
  height: 45px;
  /* background-color: red; */
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  color: gray;
  justify-content: space-around;
}
.middle_top_progress {
  width: 60%;
}
.middle_top_progress > div {
  width: 100%;
  height: 5px;
  background-color: lightgray;
}
.middle_top_progress > div > span {
  height: 5px;
  background: orangered;
  display: block;
}

.study_details_bottom {
  width: 100%;
  height: 40px;
  background-color: white;
  position: fixed;
  bottom: 0px;
  display: inline-flex;
  justify-content: space-between;
  border-top: 1px solid lightgray;
}
.study_details_bottom > div {
  width: 33%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.study_details_bottom > div > span {
  font-size: 12px;
  color: gray;
}
</style>