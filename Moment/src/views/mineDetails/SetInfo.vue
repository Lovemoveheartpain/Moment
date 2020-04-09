<template>
  <div class="set_info_container" id="aaa">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">修改个人信息</span>
      <span slot="right" class="right_span" @click="save">保存</span>
    </NavigationTopVue>
    <div class="set_info_box">
      <div v-if="tag == 'sex'"></div>
      <div v-if="tag == 'nickname'"></div>
      <ul v-if="tag == 'subjects'">
        <li v-for="(item,index) in value" :key="index" ref="li">
          <input type="checkbox" :id="'radio_'+index" ref="checkbox" :value="item.id" />
          <label :for="'radio_'+index">{{item.name}}{{checkbox}}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavigationTopVue from "../../common/NavigationTop.vue";
import { bus } from "../../network";

export default {
  components: {
    NavigationTopVue
  },
  data() {
    return {
      checkbox: this.$route.query.select
    };
  },
  computed: {
    tag() {
      return this.$route.query.tag;
    },
    value() {
      return JSON.parse(this.$route.query.value);
    }
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    save() {
      let val;

      switch (this.tag) {
        case "sex":
          val = "";
          break;
        case "nickname":
          val = "";
          break;
        case "subjects":
          val = [];
          this.$refs.checkbox.forEach(element => {
            if (element.checked) {
              val.push({
                attr_val_id: element.value,
                attr_id: 2
              });
            }
          });
          break;
        default:
          break;
      }
      val = JSON.stringify(val);
      console.log(val);
      bus
        .user({ user_attr: val })
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data);
            this.$router.push("/info");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.teal {
  font-size: 18px;
  color: gray;
}
.fan_icon {
  color: gray;
  font-size: 20px;
}
.right_span {
  color: gray;
  font-size: 14px;
}
.set_info_container {
  padding-top: 55px;
  font-size: 16px;
}
.set_info_box {
  background-color: white;
}
</style>