<template>
  <div class="discuss_container">
    <img class="empty_img" src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt />
    <p class="empty_text">
      <slot name="msg"></slot>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.discuss_container {
  margin-top: 100px;
  text-align: center;
}
.empty_text {
  font-size: 16px;
  color: lightgray;
  margin-top: 15px;
}
.empty_img {
  width: 150px;
  height: 150px;
}
</style>