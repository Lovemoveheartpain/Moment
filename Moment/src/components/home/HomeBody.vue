<template>
  <div class="home_container">
    <section v-for="(item, index) in initAppData" :key="index">
      <ProjectVue :title="item.channel_info" :list="item.list" />
    </section>
  </div>
</template>

<script>
import { bus } from "../../network/index";
import ProjectVue from "./Project.vue";

export default {
  components: {
    ProjectVue
  },
  data() {
    return {
      initAppData: []
    };
  },
  methods: {
    init() {
      bus
        .appIndex()
        .then(res => {
          this.initAppData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.home_container {
  width: 96%;
  margin-top: 100px;
  padding-left: 2%;
  padding-right: 2%;
  font-size: 14px;
  padding-bottom: 70px;
}
</style>