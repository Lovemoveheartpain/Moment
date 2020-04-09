<template>
  <div id="app">
    <keep-alive exclude="teacher,login,record,concern,collect">
      <router-view v-show="!isShow" />
    </keep-alive>
    <router-view name="bar" />
    <MessageVue />
    <ModalVue v-show="flag" />
    <ServiceVue v-show="isShow" />
  </div>
</template>
<script>
import MessageVue from "./common/Message.vue";
import ModalVue from "./components/home/Modal.vue";
import ServiceVue from "./common/Service.vue";

export default {
  components: {
    MessageVue,
    ModalVue,
    ServiceVue
  },
  computed: {
    flag() {
      return this.$store.state.flag;
    },
    isShow() {
      return this.$store.state.isShow;
    }
  }
};
</script>
<style>
* {
  padding: 0px;
  margin: 0px;
  list-style: none;
  text-decoration: none;
}
html {
  background-color: #f0f2f5;
}
</style>
