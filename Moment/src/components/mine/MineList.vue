<template>
  <div class="mine_list_contaienr">
    <div v-for="(item,index) in user_info_list" :key="index">
      <h3>{{item.title}}</h3>
      <div class="user_list_content">
        <div
          class="info_item"
          v-for="(list, number) in item.details"
          :key="number"
          @click="toPath(list.path)"
        >
          <img :src="list.img" alt />
          <p>{{list.text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_info_list: [
        {
          title: "课程相关",
          details: [
            {
              img: require("@/assets/img/icon_person_teacher.png"),
              text: "关注的老师",
              path: "/concern"
            },
            {
              img: require("@/assets/img/icon_person_collect.png"),
              text: "我的收藏",
              path: "/collect"
            }
          ]
        },
        {
          title: "订单相关",
          details: [
            {
              img: require("@/assets/img/icon_person_order.png"),
              text: "课程订单",
              path: "/order?order_type=2"
            },
            {
              img: require("@/assets/img/icon_person_order.png"),
              text: "会员订单",
              path: "/order?order_type=3"
            },
            {
              img: require("@/assets/img/icon_person_order.png"),
              text: "约课订单",
              path: "/order?order_type=1"
            }
          ]
        },
        {
          title: "我的账户",
          details: [
            {
              img: require("@/assets/img/icon_person_coupon.png"),
              text: "优惠券",
              path: "/coupon"
            },
            {
              img: require("@/assets/img/icon_person_card.png"),
              text: "学习卡",
              path: "/card"
            },
            {
              img: require("@/assets/img/icon_person_vip.png"),
              text: "会员",
              path: "/toPathVip"
            }
          ]
        },
        {
          title: "自助服务",
          details: [
            {
              img: require("@/assets/img/icon_person_news.png"),
              text: "我的消息",
              path: "/message"
            },
            {
              img: require("@/assets/img/icon_person_mail.png"),
              text: "意见反馈",
              path: "/feedback"
            },
            {
              img: require("@/assets/img/icon_person_custom.png"),
              text: "在线客服",
              path: "/mine"
            },
            {
              img: require("@/assets/img/icon_person_setting.png"),
              text: "设置",
              path: "/options"
            }
          ]
        }
      ]
    };
  },
  methods: {
    toPath(path) {
      if (path != "/mine") {
        this.$router.push(path);
      } else {
        this.$store.commit("changeShow", true);
      }
    }
  }
};
</script>

<style scoped>
.mine_list_contaienr {
  width: 90%;
  padding-left: 5%;
  padding-right: 5%;
  background-color: white;
}
.user_list_content {
  width: 100%;
  height: 80px;
  display: inline-flex;
  flex-wrap: wrap;
  border-bottom: 1px solid lightgray;
  align-items: center;
  margin: 10px auto;
}
.info_item {
  width: 25%;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.info_item > img {
  width: 20px;
  height: 20px;
  margin: 10%;
}
.info_item > p {
  width: 100%;
  text-align: center;
}
</style>