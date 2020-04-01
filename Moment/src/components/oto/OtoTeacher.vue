<template>
  <div class="oto_teacher_list">
    <img class="teacher_img" :src="list.avatar" alt />
    <div class="teacher_details">
      <p>
        <span>{{list.teacher_name}}</span>
        <span class="level_span">{{list.level_name}}</span>
      </p>
      <p class="age_span">
        <span>{{list.sex == 0?'男':'女'}}</span>
        <span>{{list.teach_age}}年教龄</span>
      </p>
    </div>
    <div class="reserve_btn" v-show="!isStar" @click="star">关注</div>
    <div class="reserve_btn" v-show="isStar" @click="star">已关注</div>
  </div>
</template>

<script>
// import { bus } from "../../network";
import {Toast} from 'vant'
export default {
  props: {
    list: Object
  },
  data() {
    return {
      isStar: false
    };
  },
  methods: {
    star() {
      this.isStar = !this.isStar;
      if(this.isStar){
          Toast('关注成功 !')
      }else{
          Toast('已取消关注 !')
      }
    }

    //     star() {
    //       let id = this.$route.query.id;
    //       console.log(id);
    //       bus
    //         .collect(id)
    //         .then(res => {
    //           console.log(res);
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         });
    //     }
  }
};
</script>

<style scoped>
.oto_teacher_list {
  width: 90%;
  height: 90px;
  background: white;
  margin-top: 10px;
  border-radius: 5px;
  display: inline-flex;
  padding-left: 5%;
  padding-right: 5%;
  align-items: center;
  justify-content: space-between;
}
.teacher_img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.reserve_btn {
  background-color: #ebeefe;
  width: 60px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  color: orange;
  border-radius: 15px;
  font-size: 14px;
}
.teacher_details {
  width: 60%;
  /* background-color: pink; */
}
.age_span {
  color: lightgray;
  font-size: 12px;
}
.level_span {
  font-size: 12px;
  color: orange;
}
</style>