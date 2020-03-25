<template>
  <div id="app">
    <keep-alive>
      <router-view v-show="isShow" />
    </keep-alive>
    <router-view name="bar" />
    <MessageVue @changeShow='change' />
  </div>
</template>
<script>
import MessageVue from "./common/Message.vue";
export default {
  components: {
    MessageVue
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
