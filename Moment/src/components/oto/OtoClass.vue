<template>
  <div class="oto_class_container">
    <div
      v-for="(item,index) in list"
      class="oto_box"
      :key="index"
      :class="item.flag?'addClass':''"
      @click="change(item)"
    >
      {{item.text}}
      <van-icon :name="item.flag?'arrow-up':'arrow-down'" />
    </div>
  </div>
</template>

<script>
import { bus } from "../../network";
export default {
  data() {
    return {
      levelList: [],
      attrList: [],
      list: [
        { text: "选择上课时间", flag: false },
        { text: "选择老师条件", flag: false }
      ]
    };
  },
  methods: {
    change(item) {
      if (item.flag) {
        item.flag = !item.flag;
      } else {
        this.list.forEach(element => {
          element.flag = false;
        });
        item.flag = !item.flag;
      }
    },
    getTeacher() {
      bus
        .otoCourseOptions()
        .then(res => {
          //   console.log(res.data.data);
          if (res.data.code == 200) {
            this.levelList = res.data.data.otoTeacherLevel;
            this.attrList = res.data.data.attrList;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getTeacher();
  }
};
</script>

<style scoped>
.oto_class_container {
  width: 100%;
  height: 42px;
  display: inline-flex;
  position: absolute;
  top: 46px;
  background-color: white;
}
.oto_box {
  width: 50%;
  height: 42px;
  background-color: red;
  line-height: 42px;
  text-align: center;
  color: gray;
}
.addClass {
  color: orange;
}
</style>