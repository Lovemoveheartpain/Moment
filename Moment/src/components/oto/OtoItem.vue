<template>
  <div>
    <div
      class="oto_teacher_list"
      v-for="(item, index) in list"
      :key="index"
      @click="change(item.teacher_id)"
    >
      <img class="teacher_img" :src="item.avatar" alt />
      <div class="teacher_details">
        <p>
          <span>{{item.real_name}}</span>
        </p>
        <p class="age_span">
          <span>{{item.sex == 0?'男':'女'}}</span>
          <span>{{item.teach_age}}年教龄</span>
        </p>
      </div>
      <div class="reserve_btn">预约</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  methods: {
    change(id) {
      this.$router.push("/teacher?id=" + id);
    }
  }
};
</script>

<style scoped>
.oto_teacher_list {
  width: 90%;
  height: 80px;
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
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: orange;
  border-radius: 15px;
}
.teacher_details {
  width: 60%;
  /* background-color: pink; */
}
.age_span {
  color: lightgray;
  font-size: 12px;
}
</style>