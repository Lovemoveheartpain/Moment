<template>
  <div class="info_container">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">个人信息</span>
    </NavigationTopVue>
    <ul class="info_ul">
      <li>
        <span>头像</span>
        <div>
          <img class="info_myicon" :src="user.avatar" alt />
          <van-icon class="fan_icon" name="arrow" />
        </div>
      </li>
      <li @click="toPath('nickname',user.nickname)">
        <span>昵称</span>
        <div>
          <span>{{user.nickname}}</span>
          <van-icon class="fan_icon" name="arrow" />
        </div>
      </li>
      <li>
        <span>手机号</span>
        <div>
          <span>{{user.mobile}}</span>
          <van-icon class="fan_icon icon" name="arrow" />
        </div>
      </li>
      <li @click="toPath('sex',user.sex)">
        <span>性别</span>
        <div>
          <span>{{user.sex==0?'男':'女'}}</span>
          <van-icon class="fan_icon" name="arrow" />
        </div>
      </li>
      <li>
        <span>出生日期</span>
        <div>
          <span>{{user.birthday}}</span>
          <van-icon class="fan_icon" name="arrow" />
        </div>
      </li>
      <li>
        <span>所在城市</span>
        <div>
          <span>{{user.province_name+','+user.city_name+","+user.district_name}}</span>
          <van-icon class="fan_icon" name="arrow" />
        </div>
      </li>
      <li @click="toPath('subjects')">
        <span>学科</span>
        <div>
          <span v-for="(item, index) in user.attr" :key="index">{{item.attr_value}}</span>
          <van-icon class="fan_icon" name="arrow" />
        </div>
      </li>
      <!-- <li>
        <span>年级</span>
        <div>
          <span>{{user.attr[0].attr_value}}</span>
          <van-icon class="fan_icon" name="arrow" />
        </div>
      </li>-->
    </ul>
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
      user: {
        attr: [{ attr_value: "" }, { attr_value: "" }]
      },
      bute: []
    };
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    toPath(tag, val) {
      if (tag == "subjects") {
        this.$router.push(
          `/set-info?tag=${tag}&value=${JSON.stringify(this.bute.value)}`
        );
      } else {
        this.$router.push(`/set-info?tag=${tag}&value=${val}`);
      }
    },
    user_info() {
      bus
        .userInfo()
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.user = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    attribute() {
      bus
        .attribute()
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.bute = res.data.data[1];
            console.log(this.bute);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.user_info();
    this.attribute();
  },
  activated() {
    this.user_info();
    this.attribute();
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

.info_container {
  padding-top: 70px;
  font-size: 14px;
}

.info_ul {
  background-color: white;
  padding: 3%;
}

.info_ul > li {
  width: 100%;
  border-bottom: 1px solid lightgray;
  height: 50px;
  line-height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}
.info_ul > li:last-child {
  border: none;
}
.info_ul > li > div {
  width: 70%;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
}
.info_ul > li > div > span {
  margin-right: 10px;
}
.info_myicon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}
.icon {
  visibility: hidden;
}
</style>