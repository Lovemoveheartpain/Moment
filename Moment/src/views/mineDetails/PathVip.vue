<template>
  <div class="path_vip_container">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">开通会员</span>
    </NavigationTopVue>
    <div class="path_vip_top">
      <img class="user_icon" :src="user.avatar" alt />
      <div class>
        <p>{{user.nickname}}</p>
        <p class="msg_p">开通会员免费学习</p>
      </div>
    </div>
    <div class="path_vip_info">
      <h4>
        购买会员
        <span class="title_span">购买会员后可免费观看会员课程</span>
      </h4>
      <div class="vip_pay_list">
        <div
          class="vip_item"
          v-for="(item,index) in list"
          :key="index"
          :class="item.status?'add':''"
          @click="change(item)"
        >
          <p>{{item.name}}</p>
          <p class="price">￥{{item.price | toFixPrice(2)}}</p>
        </div>
      </div>
    </div>
    <van-button round class="pay_btn" type="primary" @click="pay_sure">立即支付</van-button>
  </div>
</template>

<script>
import NavigationTopVue from "../../common/NavigationTop.vue";
import { bus } from "../../network";
import { Dialog } from "vant";
export default {
  components: {
    NavigationTopVue
  },
  data() {
    return {
      user: {},
      list: []
    };
  },
  computed: {
    flag() {
      let arr = "";
      this.list.forEach(element => {
        if (element.status) {
          arr = element;
        }
      });
      return arr;
    }
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    change(item) {
      this.list.forEach(element => {
        element.status = false;
      });
      item.status = true;
    },
    userInfo() {
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
    grade() {
      bus
        .grade()
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            let arr = res.data.data;
            arr.forEach(element => {
              element.status = false;
            });
            arr[0].status = true;
            this.list = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    pay_sure() {
      Dialog.confirm({
        title: "提示",
        message: "您确定购买此会员吗?"
      })
        .then(() => {
          // on confirm
          console.log(this.flag);
          this.downOrder();
        })
        .catch(() => {
          // on cancel
        });
    },
    downOrder() {
      bus
        .downOrder({ shop_id: this.flag.id, type: 14 })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data.type == 1) {
              Dialog.confirm({
                title: "提示",
                message: res.data.data.msg,
                confirmButtonText: "去充值"
              })
                .then(() => {
                  this.$router.push('/my_currency')
                })
                .catch(() => {
                  // on cancel
                });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.grade();
    this.userInfo();
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
.msg_p {
  font-size: 14px;
  color: lightgray;
}
.user_icon {
  width: 45px;
  height: 45px;
  border-radius: 25px;
  margin-left: 10px;
  margin-right: 10px;
}
.path_vip_container {
  padding-top: 46px;
  font-size: 16px;
}
.path_vip_top {
  padding: 10px;
  width: 100%;
  background-color: white;
  display: inline-flex;
  align-items: center;
}
.path_vip_info {
  padding: 5%;
}
.title_span {
  font-size: 12px;
  color: gray;
  font-weight: 200;
}
.pay_btn {
  background: linear-gradient(90deg, #eac687 0%, #c8ae84 100%);
  border: none;
  position: fixed;
  bottom: 50px;
  display: block;
  width: 90%;
  margin: 0 auto;
  left: 50%;
  margin-left: -45%;
}
.vip_item {
  width: 30%;
  height: 100px;
  background-color: lightgray;
  border-radius: 10px;
  margin: 1.5%;
  border: 1px solid gray;
  display: inline-flex;
  flex-wrap: wrap;
  align-content: center;
}
.vip_pay_list {
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
.add {
  background-color: #f9f0d9;
  border: 1px solid #e6c37f;
}
.vip_item > p {
  width: 100%;
  text-align: center;
}
.price {
  font-size: 25px;
  color: orange;
}
</style>