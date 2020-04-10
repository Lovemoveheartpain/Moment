<template>
  <div class="teacher_container">
    <header class="header_top">
      <NavigationTopVue :background="'#60AFFA'">
        <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
        <span slot="middle" style="color:white">预约课程</span>
      </NavigationTopVue>
    </header>
    <div class="teach_details_box">
      <OtoTeacherVue :list="teacherList.teacher">
        <div slot="right" class="right">
          <div class="watch_details" @click="change">查看详情</div>
        </div>
      </OtoTeacherVue>
      <emptyVue>
        <span slot="msg">暂无信息</span>
      </emptyVue>
    </div>
  </div>
</template>

<script>
import { bus } from "../network";
import NavigationTopVue from "../common/NavigationTop.vue";
import OtoTeacherVue from "../components/oto/OtoTeacher.vue";
import emptyVue from "../common/empty.vue";
export default {
  components: {
    NavigationTopVue,
    OtoTeacherVue,
    emptyVue
  },
  data() {
    return {
      id: this.$route.query.id,
      teacherList: { teacher: {}, flag: "" }
    };
  },
  methods: {
    change() {
      this.$router.push("/teacher?id=" + this.id);
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
    }
  },
  activated() {
    this.id = this.$route.query.id;
    this.getTeacher();
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
.teach_details_box {
  width: 94%;
  padding-left: 3%;
  padding-right: 3%;
  position: absolute;
  top: 40px;
}
.right {
  width: 25%;
  display: inline-flex;
  justify-content: center;
}
.watch_details {
  width: 100%;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border: 1px solid orange;
  color: orange;
  border-radius: 15px;
  font-size: 12px;
}
</style>