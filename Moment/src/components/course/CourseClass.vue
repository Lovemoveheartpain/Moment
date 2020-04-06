<template>
  <van-dropdown-menu class="course_class_container" active-color="orange">
    <van-dropdown-item title="分类" ref="item1">
      <div class="class_details_box">
        <div v-for="(item,index) in attrList" :key="index" class="attr_list_box">
          <p class="title_text">{{item.name}}</p>
          <div
            class="type_list"
            v-for="(list, index1) in item.child"
            :key="index1"
            :class="list.status?'addClass':''"
            @click="select_one(item.child,index1)"
          >
            <div :style="{background:list.status?'#EBEEFE':''}">{{list.name}}</div>
          </div>
        </div>
        <div class="btn_bottom_box">
          <van-button type="default" @click="reset" class="btn_bottom">重置</van-button>
          <van-button type="primary" @click="sure" class="btn_bottom" color="#EB6100">确定</van-button>
        </div>
      </div>
    </van-dropdown-item>
    <van-dropdown-item title="排序" ref="item2">
      <div
        class="option_list"
        v-for="(item,index) in option"
        :key="index"
        @click="select_item('排序',option,index)"
      >
        <span :class="item.status?'addClass':''">{{item.text}}</span>
      </div>
    </van-dropdown-item>
    <van-dropdown-item title="筛选" ref="item3">
      <div class="type_container">
        <div
          class="type_list"
          v-for="(item, index) in type"
          :key="index"
          :class="item.status?'addClass':''"
          @click="select_item('筛选',type,index)"
        >
          <div :style="{background:item.status?'#EBEEFE':''}">{{item.value}}</div>
        </div>
      </div>
    </van-dropdown-item>
  </van-dropdown-menu>
</template>

<script>
import { bus } from "../../network";
export default {
  data() {
    return {
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
      attrList: [],
      val: []
    };
  },
  methods: {
    select_item(title, items, index) {
      items.forEach(element => {
        element.status = false;
      });
      items[index].status = true;
      let type;
      if (title == "排序") {
        this.$refs.item2.toggle();
        type = "type_two";
      } else if (title == "筛选") {
        this.$refs.item3.toggle();
        type = "type_three";
      }
      this.$emit(type, index);
    },
    select_one(item, index) {
      item.forEach(element => {
        element.status = false;
      });
      item[index].status = true;
    },
    reset() {
      this.attrList.forEach(element => {
        element.child.forEach(ele => {
          ele.status = false;
        });
      });
      this.val = [];
      this.sure();
    },
    sure() {
      this.attrList.forEach(element => {
        element.child.forEach(ele => {
          if (ele.status == true) {
            let index = this.val.findIndex(item => item == ele.id);
            if (index == -1) {
              this.val.push(ele.id);
            }
          }
        });
      });
      this.$refs.item1.toggle();
      let value = this.val.toString();
      this.$emit("type_one", value);
    }
  },
  mounted() {
    bus.courseClassify().then(res => {
      if (res.data.code == 200) {
        console.log(res.data.data);
        let arr = res.data.data.attrclassify;
        arr.forEach(element => {
          // for (let index = 0; index < element.child.length; index++) {
          //   // element.child[index] = Object.assign(element.child[index], {
          //   //   status: false
          //   // });
          //   element.child[index].status = false
          // }
          element.child.forEach(ele => {
            ele.status = false;
          });
        });
        this.attrList = arr;
        console.log(this.attrList);
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
  font-size: 14px;
  z-index: 10;
  border-top: 1px solid lightgray;
}
.class_details_box {
  width: 94%;
  padding: 3%;
}
.classify_div {
  width: 33%;
  text-align: center;
}
.attr_list_box {
  border-bottom: 1px solid lightgray;
  padding-top: 9px;
}
.title_text {
  font-size: 12px;
}
.addClass {
  color: orange;
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
.btn_bottom_box {
  width: 100%;
  display: inline-flex;
  justify-content: space-around;
  margin-top: 10px;
}
.btn_bottom {
  width: 40%;
  height: 30px;
  line-height: 30px;
}
</style>
