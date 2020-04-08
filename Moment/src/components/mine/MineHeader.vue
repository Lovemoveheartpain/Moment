<template>
  <div class="mine_header_container">
    <div class="mine_message_box">
      <div class="mine_message_box_top" @click="toPath('/info')">
        <div style="position: relative;">
          <img class="info_icon" :src="info.avatar" alt />
          <img class="crown_icon" src="../../assets/img/皇冠-2 拷贝@2x.png" alt />
        </div>
        <div>
          {{info.nickname}}
          <van-icon class="edit_icon" name="edit" />
        </div>
      </div>
      <div class="user_list_container">
        <div v-for="(item, index) in user_list" :key="index" @click="toPath(item.path)">
          <p class="details_p1">
            <span v-if="item.num == 0&&index==2">0.00</span>
            <span v-else-if="index == 2">{{item.num | toFixPrice(2)}}</span>
            <span v-else>{{item.num}}</span>
          </p>
          <p>{{item.text}}</p>
          <p class="details_p3">{{item.details}}</p>
        </div>
      </div>
      <div class="invite_ke" @click="toOto">
        <span>去约课</span>
      </div>
    </div>
  </div>
</template>


<script>
import { bus } from "../../network";
export default {
  data() {
    return {
      info: {},
      user_list: [
        {
          text: "我的特色课",
          num: 0,
          path: "/my_study",
          details: "已购特色课程的学习"
        },
        {
          text: "一对一辅导",
          num: 0,
          path: "/record",
          details: "我的一对一老师辅导"
        },
        {
          text: "剩余学习币",
          num: 0,
          path: "/my_currency",
          details: "查看剩余学习币"
        }
      ]
    };
  },
  methods: {
    toOto() {
      this.$router.push("/oto");
    },
    toPath(path) {
      this.$router.push(path);
    },
    getUCenterInfo() {
      bus
        .getUCenterInfo()
        .then(res => {
          console.log(res.data);
          this.info = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getUCenterInfo();
  }
};
</script>

<style scoped>
.mine_header_container {
  width: 100%;
  height: 220px;
  background: url("../../assets/img/user_bg.png") no-repeat;
  background-size: 100%;
  position: relative;
}
.mine_message_box {
  position: absolute;
  bottom: 0px;
  width: 90%;
  height: 170px;
  background-color: white;
  left: 50%;
  margin-left: -45%;
  border-radius: 8px;
  overflow: hidden;
  font-size: 16px;
  box-shadow: 1px 1px 5px lightgray;
}
.invite_ke {
  position: absolute;
  right: -20px;
  top: 40px;
  width: 70px;
  height: 25px;
  background-color: #eb6100;
  border-radius: 15px;
  padding-left: 10px;
  color: white;
  line-height: 25px;
  font-size: 12px;
}
.info_icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 10px;
}
.edit_icon {
  color: orange;
  font-size: 20px;
}
.mine_message_box_top {
  width: 100%;
  height: 80px;
  /* background-color: indianred; */
  display: inline-flex;
}
.mine_message_box_top > div {
  display: inline-flex;
  align-items: center;
}
.crown_icon {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 3px;
  right: 3px;
}
.user_list_container {
  width: 100%;
  height: 80px;
  /* background: red; */
  display: inline-flex;
  text-align: center;
  justify-content: space-around;
}
.user_list_container > div {
  width: 32%;
  /* background: pink; */
  display: inline-flex;
  flex-wrap: wrap;
  align-content: center;
}
.user_list_container > div > p {
  width: 100%;
}
.details_p3 {
  font-size: 12px;
  color: gray;
}
.details_p1 {
  font-size: 20px;
  color: orange;
}
</style>