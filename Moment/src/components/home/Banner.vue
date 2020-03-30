<template>
  <div class="banner_container">
    <van-swipe :autoplay="3000" :show-indicators="false">
      <van-swipe-item v-for="(image, index) in banner" :key="index">
        <img v-lazy="image.banner_img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { bus } from '../../network';
export default {
  data() {
    return {
      banner: [
        {
          banner_img:
            "http://img3.imgtn.bdimg.com/it/u=3125526008,3010441145&fm=26&gp=0.jpg"
        },
        {
          banner_img:
            "http://img0.imgtn.bdimg.com/it/u=1293819094,491832770&fm=26&gp=0.jpg"
        },
        {
          banner_img:
            "http://img0.imgtn.bdimg.com/it/u=4107989913,3598462021&fm=26&gp=0.jpg"
        },
        {
          banner_img:
            "http://img3.imgtn.bdimg.com/it/u=4083340170,2195266927&fm=11&gp=0.jpg"
        }
      ]
    };
  },
  methods: {
    getBanner(){
      bus.getBanner().then((res)=>{
        console.log(res)
      })
    }
  },
  mounted() {
    this.getBanner()
  },
};
</script>

<style  scoped>
.banner_container {
  width: 100%;
  height: 200px;
}
.van-swipe-item > img {
  width: 100%;
  height: 200px;
}
</style>