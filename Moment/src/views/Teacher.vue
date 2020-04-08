<template>
  <div class="teacher_container">
    <header class="header_top">
      <NavigationTopVue :background="'#60AFFA'">
        <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
        <span slot="middle" style="color:white">讲师详情</span>
      </NavigationTopVue>
    </header>
    <div class="teach_details_box">
      <OtoTeacherVue :list="teacherList.teacher">
        <div slot="right" class="right">
          <div
            :class="teacherList.flag == 1?'reserve_btn_right1':'reserve_btn_right2'"
            @click="star"
          >{{teacherList.flag == 1?'关注':"已关注"}}</div>
        </div>
      </OtoTeacherVue>
    </div>
    <div class="tab_container">
      <van-tabs
        v-model="active"
        title-active-color="#EB6100"
        line-width="20px"
        color="#EB6100"
        @click="onClick"
      >
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
          <div class="tab_box">
            <van-list
              class="course_list_container"
              v-model="loading"
              :finished="finished"
              :offset="1"
              finished-text="没有更多了"
              @load="shua"
            >
              <ItemTwoVue :list="list" />
            </van-list>
          </div>
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
import ItemTwoVue from "../common/ItemTwo.vue";
import { Toast } from "vant";
export default {
  name: "teacher",
  components: {
    NavigationTopVue,
    OtoTeacherVue,
    ItemTwoVue
  },
  data() {
    return {
      id: this.$route.query.id,
      teacherList: { teacher: {}, flag: "" },
      teacherInfoList: { attr: [], intro: "" },
      active: 0,
      page: 0,
      limit: 10,
      list: [],
      total: 0,
      loading: false,
      finished: false,
    };
  },
  methods: {
    onClick(name) {
      if (this.list.length == 0 && name == 1) {
        this.shua();
      }
    },
    star() {
      let id = this.$route.query.id;
      bus
        .collect(id)
        .then(res => {
          console.log(res.data.data);
          if (res.data.code == 200) {
            if (res.data.data.flag == 2) {
              Toast("关注成功 !");
            } else if (res.data.data.flag == 1) {
              Toast("已取消关注 !");
            }
            this.getTeacher();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    shua() {
      this.page++;
      bus
        .mainCourse({
          teacher_id: this.id,
          page: this.page,
          limit: this.limit
        })
        .then(res => {
          this.list = [...this.list, ...res.data.data.list];
          this.total = res.data.data.total;
          this.loading = false;
          if (this.list.length >= this.total) {
            this.finished = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
            this.teacherList = res.data.data;
            console.log(this.teacherList);
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
            this.teacherInfoList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
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
.course_list_container {
  width: 94%;
  padding: 10px 3% 50px;
  background: #f0f2f5;
  font-size: 14px;
}
.right {
  width: 25%;
  /* background-color: red; */
  display: inline-flex;
  justify-content: center;
}
.reserve_btn_right1 {
  background-color: #ebeefe;
  width: 60px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  color: orange;
  border-radius: 15px;
  font-size: 14px;
}
.reserve_btn_right2 {
  background-color: #ebeefe;
  width: 60px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  color: gray;
  border-radius: 15px;
  font-size: 14px;
}
</style>