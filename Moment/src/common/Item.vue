<template>
  <div>
    <div
      v-for="(item, index) in list"
      :key="index"
      class="oto_content"
      @click="change(item.teacher_id)"
    >
      <img :src="item.teacher_avatar" alt />
      <div class="oc_item">
        <p>
          <span>{{item.teacher_name}}</span>
          <span class="level_name" v-if="item.level_name">{{item.level_name}}</span>
        </p>
        <p>{{item.introduction}}</p>
      </div>
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
.oto_content {
  width: 94%;
  height: 60px;
  padding: 3%;
  background-color: white;
  border-radius: 5px;
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
}
.oto_content > img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}
.oc_item {
  width: 83%;
  height: 60px;
  /* background: rosybrown; */
  display: inline-flex;
  flex-wrap: wrap;
  align-content: center;
}
.oc_item > p {
  width: 100%;
  height: 25px;
  line-height: 25px;
  /* background: red; */
}
.oc_item :nth-child(2) {
  font-size: 12px;
  color: lightgray;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.oc_item > p > .level_name {
  color: darkorange;
  font-size: 12px;
  margin-left: 5px;
}
</style>