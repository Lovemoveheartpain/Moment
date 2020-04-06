<template>
  <div class="course_details">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <h3 v-show="isTop" slot="middle">课程详情</h3>
      <div v-show="!isTop" slot="middle" class="details_middle_container">
        <div v-for="(item, index) in items" :key="index">{{item}}</div>
      </div>
      <van-icon slot="right" class="share_icon" @click="isShow = true" name="share" />
    </NavigationTopVue>
    <div class="course_details_contaier">
      <div class="cd_cro_top">
        <p class="cd_top_title">{{list.info.title}}</p>
        <van-icon
          :name="star?'star':'star-o'"
          class="star_icon"
          :color="star?'orange':''"
          @click="changestar"
        />
        <p class="cd_top_price">{{list.info.price == 0?"免费":'￥'+list.info.price}}</p>
        <p class="cd_top_bottom">共{{list.info.total_periods}}课时 | {{list.info.sales_num}}人已报名</p>
      </div>
      <div class="cd_cro">
        <p class="cd_title">教学团队</p>
        <div class="teacher_list_box">
          <div class="teacher_item" v-for="(item,index) in list.teachers" :key="index">
            <img class="teacher_img" :src="item.avatar" alt />
            <p class="teacher_name">{{item.teacher_name}}</p>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in items" :key="index" class="cd_cro">
        <p class="cd_title">{{item}}</p>
        <div v-if="index == 0" class="cd_contant" v-html="list.info.course_details"></div>
        <div v-else-if="index == 1" class="cd_contant">
          <div class="outline">
            <li class="outline_details"></li>
            <div class="outline_size" v-html="list.info.course_details"></div>
          </div>
        </div>
        <div v-if="index == 2" class="cd_contant">
          <div class="discuss_container">
            <img class="empty_img" src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt />
            <p class="empty_text">暂无评论</p>
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="isShow" @click="isShow = false">
      <div class="wrapper" @click.stop>
        <div class="dialog_header">分享</div>
        <div class="dialog_img">
          <img
            src="data:image/png;base64,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"
            alt
          />
        </div>
      </div>
    </van-overlay>
    <div class="bottom_btn" @click="toNext()">立即报名</div>
  </div>
</template>

<script>
import { bus } from "../../network";
import NavigationTopVue from "../../common/NavigationTop.vue";
import { Toast } from "vant";
export default {
  components: {
    NavigationTopVue
  },
  data() {
    return {
      id: this.$route.params.id,
      list: {
        info: {},
        teachers: []
      },
      isShow: false,
      isTop: true,
      items: ["课程介绍", "课程大纲", "课程评价"],
      star: false,
    };
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    changestar() {
      this.star = !this.star;
      if (this.star) {
        Toast("收藏成功");
      } else {
        Toast("取消收藏");
      }
    },
    getDetails() {
      this.id = this.$route.params.id;
      bus
        .courseInfo(this.id)
        .then(res => {
          if (res.data.msg == "操作成功") {
            this.list = res.data.data;
            // console.log(res.data.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    headerScroll() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top > 45) {
        this.isTop = false;
      } else {
        this.isTop = true;
      }
    },
    toNext() {
      this.$router.push("/vip");
    }
  },
  activated() {
    this.getDetails();
    window.addEventListener("scroll", this.headerScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.headerScroll);
  }
};
</script>

<style scoped>
.course_details {
  width: 100%;
  font-size: 16px;
}
.share_icon {
  color: darkcyan;
  font-size: 20px;
}
.fan_icon {
  color: gray;
  font-size: 20px;
}
.wrapper {
  width: 260px;
  height: 230px;
  background: white;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  margin-left: -130px;
  top: 50%;
  margin-top: -140px;
}
.dialog_header {
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 18px;
  color: gray;
}
.dialog_img {
  width: 100%;
  text-align: center;
}

.details_middle_container {
  width: 100%;
  height: 100%;
  /* background: red; */
  display: inline-flex;
  justify-content: space-between;
}
.details_middle_container > div {
  width: 30%;
  height: 45px;
  /* background: orange; */
  line-height: 45px;
  text-align: center;
  color: gray;
}
.bottom_btn {
  width: 100%;
  height: 45px;
  background-color: #eb6100;
  text-align: center;
  line-height: 45px;
  color: white;
  position: fixed;
  bottom: 0px;
}
.course_details_contaier {
  width: 100%;
  /* background-color: cornflowerblue; */
  margin-top: 50px;
  padding-bottom: 50px;
  font-size: 14px;
}
.cd_cro {
  background-color: white;
  margin-top: 15px;
  padding: 10px 10px;
}
.cd_contant {
  padding: 5px 15px;
}
.outline {
  width: 100%;
  height: 40px;
  display: inline-flex;
  align-items: center;
}
.outline_details {
  list-style-type: disc;
  color: orange;
  width: 15px;
}
.outline_size {
  font-size: 12px;
}

.empty_img {
  width: 150px;
  height: 150px;
}

.discuss_container {
  text-align: center;
}
.empty_text {
  font-size: 16px;
  color: lightgray;
  margin-top: 15px;
}
.teacher_img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.teacher_name {
  font-size: 12px;
  color: gray;
}
.teacher_list_box {
  width: 100%;
  /* background-color: red; */
  flex-wrap: wrap;
  display: inline-flex;
}
.teacher_item {
  width: 80px;
  text-align: center;
  padding: 15px 0px;
}
.cd_cro_top {
  padding: 15px;
  font-size: 16px;
  background: white;
  position: relative;
}

.cd_top_title {
  width: 300px;
  font-size: 17px;
}
.cd_top_price {
  color: orange;
  margin: 10px 0px;
}
.cd_top_bottom {
  color: gray;
}

.star_icon {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 20px;
}
</style>