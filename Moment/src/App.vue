<template>
  <div id="app">
    <keep-alive>
      <router-view v-show="isShow" />
    </keep-alive>
    <router-view name="bar" />
    <MessageVue @changeShow="change" />
    <ModalVue v-show="flag" />
  </div>
</template>
<script>
import MessageVue from "./common/Message.vue";
import ModalVue from "./components/home/Modal.vue";

export default {
  components: {
    MessageVue,
    ModalVue
  },
  computed: {
    flag() {
      return this.$store.state.flag;
    }
  },
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    change() {
      this.isShow = !this.isShow;
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
