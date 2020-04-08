<template>
  <div class="currency_container">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">我的余额</span>
    </NavigationTopVue>
    <div class="coin_title">
      我的余额
      <span>{{list.coinUnitType}}学习币</span>
    </div>
    <div class="coin_content">
      <div
        class="coin_item"
        v-for="(item,index) in list.list"
        :class="item.status?'add':''"
        :key="index"
        @click="click(item)"
      >
        <span>{{item.coin|toFixPrice(2)}}学习币</span>
        <span class="rmb_span">￥{{item.rmb | toFixPrice(2)}}</span>
      </div>
    </div>
    <div class="coin_footer">
      <h3>充值说明</h3>
      <p>{{list.coinInfo.agreement}}</p>
    </div>
    <van-button
      class="icon_btn"
      :class="flag?'t':'f'"
      type="primary"
      size="large"
      @click="submit"
    >立即充值</van-button>
    <van-action-sheet v-model="show" title="支付方式">
      <div class="content">
        <p>
          <input type="radio" name="zf" v-model="pay.type" value="wx" id="wx" />
          <label for="wx">
            <img src="../../assets/img/微信支付.png" alt />微信
          </label>
        </p>
        <p>
          <input type="radio" name="zf" v-model="pay.type" value="ali" id="ali" />
          <label for="ali">
            <img src="../../assets/img/支付宝.png" alt />支付宝
          </label>
        </p>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import NavigationTopVue from "../../common/NavigationTop.vue";
import { bus } from "../../network";
import { Toast } from "vant";
export default {
  components: {
    NavigationTopVue
  },
  data() {
    return {
      list: {
        coinInfo: {},
        coinUnitType: 0,
        list: []
      },
      show: false,
      pay: {
        type: "",
        coin_id: ""
      }
    };
  },
  computed: {
    flag() {
      let arr = [];
      this.list.list.forEach(element => {
        if (element.status) {
          arr.push(element);
        }
      });
      return arr.length == 0 ? false : true;
    }
  },
  methods: {
    submit() {
      if (this.flag) {
        if (this.pay.type && this.show) {
          bus
            .pay(this.pay)
            .then(res => {
              console.log(res.data.data);
              Toast("支付失败");
            })
            .catch(err => {
              console.log(err);
            });
        }
        this.show = true;
      }
    },
    fan() {
      this.$router.go(-1);
    },
    click(item) {
      this.list.list.forEach(element => {
        element.status = false;
      });
      item.status = true;
      this.pay.coin_id = item.id;
    },
    coinRank() {
      bus
        .coinRank()
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            let arr = res.data.data;
            arr.list.forEach(element => {
              element.status = false;
            });
            this.list = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.coinRank();
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
.currency_container {
  padding-top: 45px;
  padding-bottom: 80px;
  font-size: 14px;
}
.coin_content {
  padding: 0px 5%;
}
.coin_title {
  height: 55px;
  background-color: white;
  line-height: 55px;
  padding-left: 5%;
  padding-right: 5%;
}
.coin_title > span {
  color: orange;
}
.coin_item {
  padding: 5%;
  border-radius: 10px;
  background-color: white;
  margin: 15px auto;
}
.rmb_span {
  color: red;
  float: right;
}
.coin_footer {
  background-color: white;
  padding: 5%;
  font-size: 12px;
}
.icon_btn {
  position: fixed;
  bottom: 0px;
  border: none;
  z-index: 2100;
}
.add {
  background-color: #fcede2;
  border: 1px solid orangered;
  box-shadow: 5px 5px 5px orangered;
}

.f {
  background-color: #cccccc;
}
.t {
  background-color: #eb6100;
}

.content {
  padding: 20px 30px 120px;
}
.content > p {
  width: 100%;
  height: 40px;
  display: inline-flex;
  align-items: center;
}
.content > p > label {
  display: inline-flex;
  align-items: center;
}
.content > p > label > img {
  height: 30px;
  width: 30px;
  margin: 0 10px;
}
</style>