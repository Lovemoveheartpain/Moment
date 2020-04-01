<template>
  <div style="font-size:16px;">
    <NavigationTopVue :background="'white'">
      <span class="teal" slot="middle">特色课</span>
      <van-icon class="search_icon" @click="toSearch" slot="right" name="search" />
    </NavigationTopVue>
    <CourseClassVue />
    <van-list
      class="course_list_container"
      v-model="loading"
      :finished="finished"
      :offset="1"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ItemTwoVue :list="list" />
    </van-list>
  </div>
</template>

<script>
import NavigationTopVue from "../common/NavigationTop.vue";
import CourseClassVue from "../components/course/CourseClass.vue";
import { bus } from "../network";
import ItemTwoVue from "../common/ItemTwo.vue";

export default {
  data() {
    return {
      form: {
        page: 0,
        limit: 10,
        course_type: 0,
        classify_id: "",
        order_by: 0,
        attr_val_id: "",
        is_vip: 0
      },
      list: [],
      loading: false,
      finished: false,
      total: ""
    };
  },
  components: {
    NavigationTopVue,
    CourseClassVue,
    ItemTwoVue
    // CourseListVue,
  },
  methods: {
    toSearch() {
      this.$router.push("/search");
    },
    onLoad() {
      this.form.page++;
      setTimeout(() => {
        bus.courseBasis(this.form).then(res => {
          if (res.data.code == 200) {
            // console.log(res.data.data);
            this.list = [...this.list, ...res.data.data.list];
            this.total = res.data.data.total;
            this.loading = false;
            if (this.list.length >= this.total) {
              this.finished = true;
            }
          }
        });
      }, 1000);
    }
  }
};
</script>

<style scoped>
.teal {
  font-size: 18px;
  color: gray;
}
.search_icon {
  font-size: 25px;
}
.course_item_content {
  width: 100%;
  padding-top: 40px;
  background: rebeccapurple;
}
.course_list_container {
  width: 94%;
  padding: 100px 3% 70px;
  background: #f0f2f5;
  font-size: 14px;
}
</style>