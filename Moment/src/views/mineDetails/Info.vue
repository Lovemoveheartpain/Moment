<template>
  <div class="info_container">
    <NavigationTopVue :background="'white'">
      <van-icon class="fan_icon" slot="left" name="arrow-left" @click="fan" />
      <span class="teal" slot="middle">个人信息</span>
    </NavigationTopVue>
    <ul class="info_ul">
      <li @click="changeInfo(0)">
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
        <span>性别 {{cityId}}</span>
        <div>
          <span>{{user.sex==0?'男':'女'}}</span>
          <van-icon class="fan_icon" name="arrow" />
        </div>
      </li>
      <li @click="changeInfo(4)">
        <span>出生日期</span>
        <div>
          <span>{{user.birthday}}</span>
          <van-icon class="fan_icon" name="arrow" />
        </div>
      </li>
      <li @click="changeInfo(5)">
        <span>所在城市</span>
        <div>
          <span>{{user.province_name+','+user.city_name+","+user.district_name}}</span>
          <van-icon class="fan_icon" name="arrow" />
        </div>
      </li>
      <li @click="toPath('subjects')" ref="kk">
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
    <van-popup v-model="isShow" position="bottom">
      <div v-show="num == 0">
        <div class="content" @click="selectTou(0)">拍照</div>
        <div class="content" @click="selectTou(1)">
          <van-uploader id="upload" :after-read="after">从手机相册选择</van-uploader>
        </div>
        <div class="content" @click="isShow = false">取消</div>
      </div>
      <div v-show="num == 4">
        <van-datetime-picker
          v-model="currentDate"
          @confirm="sureTime"
          @cancel="cancel"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </div>
      <div v-show="num == 5">
        <van-area
          ref="address"
          :value="cityId"
          :area-list="areaList"
          @change="changeCity"
          @confirm="sureCity"
          @cancel="cancel"
        />
      </div>
    </van-popup>
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
      user: {},
      bute: [],
      isShow: false,
      num: 0,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
      },
      cityId: "0"
    };
  },
  methods: {
    after(file) {
      var formdata = new FormData();
      formdata.append("file", file.file);
      bus
        .img(formdata)
        .then(res => {
          if (res.data.code == 200) {
            let path = res.data.data.path;
            bus
              .user({ avatar: path })
              .then(res => {
                if (res.data.code == 200) {
                  this.user_info();
                  this.cancel();
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    sureTime(value) {
      let d = new Date(value);
      let val = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      this.putInfo({ birthday: val });
      this.cancel();
    },
    putInfo(val) {
      bus
        .user(val)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.user_info();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {
      console.log(11);
      this.isShow = false;
    },
    sureCity(item) {
      let val = {
        province_id: item[0].code,
        city_id: item[1].code,
        district_id: item[2].code
      };
      this.putInfo(val);
      this.cancel();
    },
    changeCity(val, list, sum) {
      console.log(12);
      this.cityId = list[sum].code;
      this.getCity(sum + 1);
    },
    getCity(type) {
      bus
        .sonArea(this.cityId)
        .then(res => {
          if (res.data.code == 200) {
            let arr = res.data.data;
            let obj = {};
            for (let i = 0; i < arr.length; i++) {
              const element = arr[i];
              obj[element.id] = element.area_name;
            }
            switch (type) {
              case 0:
                this.areaList.province_list = obj;
                this.cityId = Object.keys(this.areaList.province_list)[0];
                this.getCity(1);
                break;
              case 1:
                this.areaList.city_list = obj;
                this.cityId = Object.keys(this.areaList.city_list)[0];
                this.getCity(2);
                break;
              case 2:
                this.areaList.county_list = obj;
                break;
              default:
                break;
            }
            console.log(obj);
            console.log(this.$refs.address)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeInfo(num) {
      this.isShow = true;
      this.num = num;
    },
    selectTou(item) {
      switch (item) {
        case 0:
          Toast("设备不支持");
          this.isShow = false;
          break;
        case 1:
          break;

        default:
          break;
      }
    },
    fan() {
      this.$router.push("/mine");
    },
    toPath(tag, val) {
      if (tag == "subjects") {
        let arr = [];
        this.user.attr.forEach(element => {
          arr.push("check" + element.attr_val_id);
        });
        this.$router.push(
          `/set-info?tag=${tag}&value=${JSON.stringify(
            this.bute.value
          )}&select=${JSON.stringify(arr)}`
        );
      } else {
        this.$router.push(`/set-info?tag=${tag}&value=${JSON.stringify(val)}`);
      }
    },
    city(){

    },
    user_info() {
      bus
        .userInfo()
        .then(res => {
          if (res.data.code == 200) {
            // console.log(res.data.data);
            this.user = res.data.data;
            this.getCity(0)
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
            // console.log(res.data.data);
            this.bute = res.data.data[1];
            console.log(this.bute);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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
  padding-top: 55px;
  font-size: 14px;
}
.content {
  width: 100%;
  line-height: 45px;
  text-align: center;
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