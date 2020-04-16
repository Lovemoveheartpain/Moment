<template>
  <div class="set_info_container">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">修改个人信息</span>
      <span slot="right" class="right_span" @click="save">保存</span>
    </NavigationTopVue>
    <div class="set_info_box">
      <ul v-if="tag == 'sex'" class="sex_container">
        <li v-for="(item, index) in sexList" :key="index" @click="selectOne(item.num)">
          {{item.sex}}
          <van-icon v-show="value== item.num?true:false" class="success_icon" name="success" />
        </li>
      </ul>
      <div v-if="tag == 'nickname'" class="inp_content">
        <input v-model="value" type="text" name id />
      </div>
      <ul v-if="tag == 'subjects'">
        <van-checkbox-group v-model="select">
          <li class="check_li" v-for="(item,index) in finish" :key="index">
            <van-checkbox ref="checkbox" :value="item.id" :name="item.status">{{item.name}}</van-checkbox>
          </li>
        </van-checkbox-group>
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
  name: "setInfo",
  data() {
    return {
      checked: this.$route.query.select,
      value: JSON.parse(this.$route.query.value),
      sexList: [
        { sex: "男", num: 0 },
        { sex: "女", num: 1 }
      ],
      select: []
    };
  },
  computed: {
    tag() {
      return this.$route.query.tag;
    },
    finish() {
      let arr = this.value;
      arr.forEach(element => {
        element.status = "check" + element.id;
      });
      return arr;
    }
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    selectOne(num) {
      this.value = num;
    },
    save() {
      let val;
      let type;
      switch (this.tag) {
        case "sex":
          val = { sex: this.value };
          break;
        case "nickname":
          val = { nickname: this.value };
          break;
        case "subjects":
          type = [];
          this.$refs.checkbox.forEach(element => {
            if (element.checked) {
              type.push({
                attr_val_id: element.value,
                attr_id: 2
              });
            }
          });
          val = { user_attr: JSON.stringify(type) };
          break;
        default:
          break;
      }
      this.putInfo(val);
    },
    putInfo(val) {
      bus
        .user(val)
        .then(res => {
          if (res.data.code == 200) {
            this.$router.push("/info");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    if (this.tag == "subjects") {
      this.select = JSON.parse(this.checked);
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
.inp_content {
  width: 90%;
  height: 45px;
  display: inline-flex;
  padding-left: 5%;
  padding-right: 5%;
  align-items: center;
}
.inp_content > input {
  width: 100%;
  height: 100%;
  border: none;
}

.sex_container > li {
  padding-left: 5%;
  padding-right: 5%;
  border-bottom: 1px solid lightgray;
  height: 45px;
  display: inline-flex;
  align-items: center;
  width: 90%;
  justify-content: space-between;
}

.success_icon {
  color: orangered;
}

.check_li {
  padding-left: 5%;
  padding-right: 5%;
  border-bottom: 1px solid lightgray;
  height: 45px;
  width: 90%;
  display: inline-flex;
  align-items: center;
}
</style>