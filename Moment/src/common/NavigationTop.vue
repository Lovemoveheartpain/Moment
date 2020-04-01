<template>
  <div class="navigation_top" :style="{backgroundColor:background}">
    <div class="common_nav_top navigation_left">
      <slot name="left"></slot>
    </div>
    <div class="common_nav_top navigation_middle">
      <slot name="middle"></slot>
    </div>
    <div class="common_nav_top navigation_right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    background: String
  }
};
</script>

<style scoped>
.navigation_top {
  width: 100%;
  height: 45px;
  /* background-color: white; */
  display: inline-flex;
  position: fixed;
  top: 0px;
  z-index: 10;
}
.navigation_left {
  width: 10%;
  height: 100%;
  /* background: red; */
}
.navigation_middle {
  width: 80%;
  height: 100%;
  /* background: pink; */
}
.navigation_right {
  width: 10%;
  height: 100%;
  /* background: red; */
}
.common_nav_top {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>