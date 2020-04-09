<template>
  <div class="collect_container">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">我的收藏</span>
    </NavigationTopVue>
    <van-list
      v-show="!isShow"
      class="oto_for_box"
      v-model="loading"
      :finished="finished"
      :offset="1"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index" class="ii_content" @click="toDetails(item)">
        <van-icon name="star" class="star_icon" @click.stop="cancel(item.collect_id)" />
        <p class="title_content">{{item.title}}</p>
        <div class="total_periods">
          {{item.start_play_date | fomartTime('MM月dd日 hh:mm')}}~
          {{item.end_play_date | fomartTime('MM月dd日 hh:mm')}} |
          共{{item.section_num}}课时
        </div>
        <div class="teacher_item">
          <div v-for="(list,num) in item.teachers" :key="num">
            <img :src="item.teachersAvatar[num]" alt />
            <span>{{list}}</span>
          </div>
        </div>
        <p class="ii-info">
          <span class="person">{{item.sales_num}}人已报名</span>
          <span class="free" v-if="item.price == 0">免费</span>
          <span class="price" v-else>￥{{item.price | toFixPrice(2)}}</span>
        </p>
      </div>
    </van-list>
    <div class="discuss_container" v-show="isShow">
      <img class="empty_img" src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt />
      <p class="empty_text">暂无收藏</p>
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
  name: "collect",
  data() {
    return {
      form: {
        page: 0,
        limit: 10,
        type: 1
      },
      loading: false,
      finished: false,
      list: [],
      total: 0,
      isShow: false
    };
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    cancel(id) {
      bus
        .cancel_collectKe(id)
        .then(res => {
          if (res.data.code == 200) {
            Toast.success("取消收藏成功!");
            this.form.page = 0;
            this.list = [];
            this.onLoad();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    splice(val) {
      let arr = [];
      arr = val.split(",");
      return arr;
    },
    toDetails(item) {
      this.$router.push("/course_details/" + item.course_id);
    },
    onLoad() {
      this.form.page++;
      setTimeout(() => {
        bus.collectTeacher(this.form).then(res => {
          if (res.data.code == 200) {
            let arr = res.data.data.list;
            arr.forEach(element => {
              element.teachers = this.splice(element.teachers);
              element.teachersAvatar = this.splice(element.teachersAvatar);
              console.log(element);
            });
            this.list = [...this.list, ...res.data.data.list];
            if (this.list.length == 0) {
              this.isShow = true;
            } else {
              this.isShow = false;
            }
            this.total = res.data.data.total;
            this.loading = false;
            if (this.list.length >= this.total) {
              this.finished = true;
            }
          }
        });
      }, 1000);
    }
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
.collect_container {
  padding-top: 70px;
  font-size: 16px;
}
.discuss_container {
  margin-top: 100px;
  text-align: center;
}
.empty_text {
  font-size: 16px;
  color: lightgray;
  margin-top: 15px;
}
.empty_img {
  width: 150px;
  height: 150px;
}

.star_icon {
  position: absolute;
  right: 20px;
  top: 20px;
  color: orangered;
}

.oto_for_box {
  padding-left: 3%;
  padding-right: 3%;
}
.ii_content {
  width: 94%;
  height: 155px;
  padding: 3%;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 15px;
  position: relative;
}

.teacher_item {
  width: 100%;
  height: 55px;
  /* background: red; */
  overflow: hidden;
}
.teacher_item > div {
  width: 30%;
  height: 55px;
  /* background: pink; */
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
}
.teacher_item > div > img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.teacher_item > div > span {
  font-size: 12px;
  color: lightgray;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title_content {
  width: 100%;
  height: 25px;
  font-size: 16px;
}
.total_periods {
  /* background: red; */
  font-size: 12px;
  line-height: 30px;
}

.person {
  color: gray;
  font-size: 13px;
}

.ii-info {
  width: 100%;
  height: 45px;
  line-height: 45px;
  border-top: 1px solid lightgray;
}

.free {
  float: right;
  color: green;
}
.price {
  float: right;
  color: red;
}
</style>