<template>
  <div>
    <div v-for="(item, index) in list" :key="index" class="ii_content" @click="toDetails(item)" >
      <p class="title_content">{{item.title}}</p>
      <div class="total_periods">共{{item.total_periods}}课时</div>
      <div class="teacher_item">
        <div>
          <img :src="item.teachers_list[0].teacher_avatar" alt />
          <span>{{item.teachers_list[0].teacher_name}}</span>
        </div>
      </div>
      <p class="ii-info">
        <span class="person">{{item.sales_num}}人已报名</span>
        <span class="free" v-if="item.price == 0">免费</span>
        <span class="price" v-else>￥{{item.price}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  mounted() {
    // this.list.forEach(element => {
    //   console.log(element);
    // });
  },
  methods: {
    toDetails(item){
      this.$router.push('/course_details/'+item.id);
    }
  },
};
</script>

<style scoped>
.ii_content {
  width: 94%;
  height: 185px;
  padding: 3%;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 15px;
}

.teacher_item {
  width: 100%;
  height: 65px;
  /* background: red; */
}
.teacher_item > div {
  width: 30%;
  height: 65px;
  /* background: pink; */
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
}
.teacher_item > div>img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.teacher_item > div>span {
  font-size: 12px;
  color: lightgray;
}
.title_content {
  width: 100%;
  height: 45px;
  font-size: 16px;
  padding-top: 10px;
  line-height: 22.5px;
}
.total_periods {
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