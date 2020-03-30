<template>
  <div class="search_page">
    <NavigationTopVue>
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <van-search
        class="input"
        @input="input"
        @focus="isShow = false"
        shape="round"
        v-model="form.keywords"
        slot="middle"
        placeholder="请输入内容"
      />
      <span class="right_span" slot="right" @click="search">{{form.keywords?'搜索':'取消'}}</span>
    </NavigationTopVue>
    <SearchHistoryVue v-show="form.keywords?false:true" />
    <van-list
      v-if="list.length != 0"
      class="search_list_container"
      v-model="loading"
      :finished="finished"
      :offset="1"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ItemTwoVue :list="list" />
    </van-list>
    <div class="discuss_container" v-show="isShow">
      <img class="empty_img" src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt />
      <p class="empty_text">暂无搜索结果</p>
    </div>
  </div>
</template>

<script>
import NavigationTopVue from "../common/NavigationTop.vue";
import SearchHistoryVue from "../components/search/SearchHistory.vue";
import { bus } from "../network";
import ItemTwoVue from "../common/ItemTwo.vue";
export default {
  components: {
    NavigationTopVue,
    SearchHistoryVue,
    ItemTwoVue
  },
  data() {
    return {
      isShow: false,
      last_page: 0,
      form: {
        page: 0,
        limit: 10,
        keywords: ""
      },
      loading: false,
      finished: false,
      list: [],
      total: 0
    };
  },
  methods: {
    input(val) {
      if (!val) {
        this.list = [];
      }
    },
    fan() {
      this.$router.go(-1);
    },
    search() {
      if (!this.form.keywords) {
        this.fan();
      } else {
        this.$store.commit("setHistory", this.form.keywords);
        this.onLoad();
      }
    },
    onLoad() {
      this.form.page++;
      setTimeout(() => {
        bus.courseBasis(this.form).then(res => {
          if (res.data.code == 200) {
            this.list = [...this.list, ...res.data.data.list];
            if (this.list.length == 0) {
              this.isShow = true;
            }
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
.search_page {
  font-size: 14px;
  height: 100vh;
  background-color: white;
}
.fan_icon {
  color: gray;
  font-size: 20px;
}
.input {
  height: 45px;
  padding: 0px;
  width: 95%;
}
.right_span {
  color: gray;
  font-size: 14px;
}
.empty_img {
  width: 150px;
  height: 150px;
}

.discuss_container {
  text-align: center;
  padding-top: 70px;
}
.empty_text {
  font-size: 16px;
  color: lightgray;
  margin-top: 15px;
}
.search_list_container {
  width: 94%;
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 70px;
  background: #f0f2f5;
}
</style>