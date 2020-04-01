<template>
  <div class="oto_conatainer">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">一对一辅导</span>
      <van-icon class="search_icon" @click="toSearch" slot="right" name="search" />
    </NavigationTopVue>
    <OtoClassVue />
    <div class="teachers_container">
      <OtoItemVue :list="list" />
    </div>
  </div>
</template>

<script>
import NavigationTopVue from "../common/NavigationTop.vue";
import OtoClassVue from "../components/oto/OtoClass.vue";
import OtoItemVue from "../components/oto/OtoItem.vue";
import { bus } from "../network";
export default {
  components: {
    NavigationTopVue,
    OtoClassVue,
    OtoItemVue
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    toSearch() {
      this.$router.push("/search");
    },
    fan() {
      this.$router.go(-1);
    },
    getTeacherMsg() {
      bus
        .otoCourse()
        .then(res => {
          if (res.data.code == 200) {
            this.list = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getTeacherMsg();
  }
};
</script>

<style scoped>
.oto_conatainer {
  width: 100%;
  font-size: 14px;
}
.teal {
  font-size: 18px;
  color: gray;
}
.search_icon {
  font-size: 25px;
}
.fan_icon {
  color: gray;
  font-size: 20px;
}

.teachers_container {
  padding: 90px 3% 30px;
}
</style>