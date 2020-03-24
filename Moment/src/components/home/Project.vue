<template>
  <div class="project_container">
    <p class="body_title">{{title.name}}</p>
    <ItemVue v-if="title.name == '名师阵容'" :list="list" />
    <ItemTwoVue v-if="title.name == '精品课程'" :list="list" />
    <ItemTwoVue v-if="title.name == '推荐课程'" :list="list" />
    <ItemVue v-if="title.name == '明星讲师'" :list="list" />
  </div>
</template>

<script>
import ItemVue from "../../common/Item.vue";
import ItemTwoVue from "../../common/ItemTwo.vue";

export default {
  components: {
    ItemVue,
    ItemTwoVue
  },
  props: {
    title: Object,
    list: Array
  }
};
</script>

<style scoped>
.project_container {
  width: 100%;
}
.body_title {
  border-left: 3px solid red;
  padding-left: 10px;
  font-size: 15px;
  margin: 10px;
}
</style>