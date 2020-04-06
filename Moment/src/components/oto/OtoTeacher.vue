<template>
  <div class="oto_teacher_list">
    <div class="teacher_img_box" >
      <img class="teacher_img" :src="list.avatar" alt />
    </div>
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
    <slot name="right"></slot>
  </div>
</template>

<script>

export default {
  props: {
    list: Object
  },
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
.teacher_img_box
{
  width: 15%;
  /* background-color: pink; */
  display: inline-flex;
  align-items: center;
}
.teacher_img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.teacher_details {
  width: 60%;
  /* background-color: gray; */
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