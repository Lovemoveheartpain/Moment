<template>
  <div id="app">
    <router-view />
    <router-view name="bar" />
    <MessageVue />
  </div>
</template>
<script>
import MessageVue from "./components/home/Message.vue";

export default {
  components: {
    MessageVue
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
