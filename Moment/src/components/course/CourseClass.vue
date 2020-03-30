<template>
  <div>
    <div class="course_class_container">
      <div
        class="classify_div"
        v-for="(item, index) in list"
        :key="index"
        @click="click(item,index)"
        :class="item.status?'addClass':''"
      >
        {{item.name}}
        <van-icon :name="item.status?'arrow-up':'arrow-down'" />
      </div>
    </div>
    <div class="select_container" v-show="select == 1">1</div>
    <div class="select_container" v-show="select == 2">
      <div
        class="option_list"
        v-for="(item,index) in option"
        :key="index"
        @click="select_one(item,option)"
      >
        <span :class="item.status?'addClass':''">{{item.text}}</span>
      </div>
    </div>
    <div class="select_container type_container" v-show="select == 3">
      <div
        class="type_list"
        v-for="(item, index) in type"
        :key="index"
        :class="item.status?'addClass':''"
        @click="select_one(item,type)"
      >
        <div>{{item.value}}</div>
      </div>
    </div>
    <van-overlay :show="flag" @click="flag = false;select = ''" />
  </div>
</template>

<script>
import { bus } from "../../network";
export default {
  data() {
    return {
      a: 5,
      b: { height: "100px", transition: "all 2s" },
      list: [
        { name: "分类", status: false },
        { name: "排序", status: false },
        { name: "筛选", status: false }
      ],
      type: [
        { value: "全部", status: true },
        { value: "大班课", status: false },
        { value: "小班课", status: false },
        { value: "公开课", status: false },
        { value: "点播课", status: false },
        { value: "面授课", status: false },
        { value: "音频课", status: false },
        { value: "系统课", status: false },
        { value: "图文课", status: false },
        { value: "会员课", status: false }
      ],
      option: [
        { text: "综合排序", status: true },
        { text: "最新", status: false },
        { text: "最热", status: false },
        { text: "价格从低到高", status: false },
        { text: "价格从高到低", status: false }
      ],
      flag: false,
      select: ""
    };
  },
  methods: {
    select_one(item, items) {
      items.forEach(element => {
        element.status = false;
      });
      item.status = true;
    },
    click(item, index) {
      if (item.status) {
        this.flag = false;
        this.select = "";
        item.status = !item.status;
      } else {
        this.flag = true;
        this.select = index + 1;
        this.list.forEach(element => {
          element.status = false;
        });
        item.status = !item.status;
      }
    }
  },
  mounted() {
    bus.courseClassify().then(res => {
      if (res.data.code == 200) {
        console.log(res.data.data);
      }
    });
  }
};
</script>

<style scoped>
.course_class_container {
  width: 100%;
  height: 40px;
  position: fixed;
  top: 45px;
  background: white;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  z-index: 10;
  font-size: 14px;
  border-top: 1px solid lightgray;
}
.classify_div {
  width: 33%;
  text-align: center;
}
.addClass {
  color: orange;
}
.select_container {
  width: 100%;
  background: white;
  position: fixed;
  top: 86px;
  z-index: 10;
  border-top: 1px solid lightgray;
}
.option_list {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: gray;
  border-bottom: 1px solid lightgray;
}

.type_container {
  padding: 10px 0px;
  display: inline-flex;
  flex-wrap: wrap;
}
.type_list {
  width: 25%;
  margin: 10px 0px;
  text-align: center;
  font-size: 13px;
  display: inline-flex;
  justify-content: center;
}
.type_list > div {
  width: 80%;
  line-height: 30px;
  background-color: #f5f5f5;
}
</style>
