<template>
  <div class="home">
    <BannerVue />
    <KindVue />
    <HomeBodyVue />
  </div>
</template>

<script>
import BannerVue from "../components/home/Banner.vue";
import KindVue from "../components/home/Kind.vue";
import HomeBodyVue from "../components/home/HomeBody.vue";

export default {
  name: "Home",
  components: {
    BannerVue,
    KindVue,
    HomeBodyVue
  }
};
</script>

<style scoped>
.home {
  width: 100%;
}
</style>