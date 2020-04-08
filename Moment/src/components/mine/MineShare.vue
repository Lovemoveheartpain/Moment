<template>
  <div>
    <div class="mine_share_container">
      <div class="mine_share_box" @click="show">
        <div style="width:15%">
          <img
            class="share_icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA2CAYAAACbZ/oUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDFGMzI1MUM3ODVBMTFFOThFMjRCMzEzRDg2Mjg3RDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDFGMzI1MUQ3ODVBMTFFOThFMjRCMzEzRDg2Mjg3RDUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MUYzMjUxQTc4NUExMUU5OEUyNEIzMTNEODYyODdENSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MUYzMjUxQjc4NUExMUU5OEUyNEIzMTNEODYyODdENSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuSIwewAAATUSURBVHja7JrbbxR1FMdnl7LlJkq1BbnIxUJi8a6tgoBaEhQxIsYHfVIT4y2++GB89Z8wvhgflTcSFKN4t6IRFcQiAtZSVAR7RWlV2rLj98TPhMm4092dnS1Td07yybbb2dnf9/c7v3PO70wzrus6RWyOuA8u4b2iH5pEy/B6WuyE4bCL64rczP5+v3hSXCfqneTaWbFIZMV2MR5FcIPYJtY5ybcc4+wVu3n9j2WLuMpCsdiZWraYcWfKFWx/uyzhblzI6hl3tlzBZtOcqWnTogatfIURuUt8L37n9wXielbAs4PiMJHV9uHlok3MjvidLuOOJDiqDYi94h3xhejn/aVik3hAzBD7SCNfkVbsveXiXrG1GvGjGoLziHhJdIoxn5d0i/1MiNkO0cM1nv3AZJ0Sz7DiiRZ8VLwhvg6ZjEHxKpMwMME1r5AWn4tzcNmYxf4pPhEHilzXHyLWb7bCHWH5NCmCh3HZ/pjuZ8HuRJIFnxNnxGhM9xvnXm5SBdeRcmbGWC7ODKuakiD4InLo/BjLxCVJdmnLo7dBpat8jbhbzEuyYK+4eFDcWUHau0I8juDEFx5mdxDA/iJNnStT7AviYXHxVBE8gxV2oaNE0SvFs+KhuF25VMGZCiLkLLEZobZ1PpqoqJetEk+JR6qxsqUI9lYnV+ExbSuip4vPyNPBSV0mnhaPxSB2etTjYd5X6TRzbdTV3kIXwurj1ylBvaDZKp5gYuJY2VEnpJ9VikvbQeBFcaNoJ900RuxC3EqqMo95jcm0HtTzYoOYG4PYHuLF8bDtk/G1aXMk+j8K1MJ1DPgmsP12dcRDuh0ZX+bwYMFpWwwiD3Ng6aKWt6bC2TDBFg2bxFrRIvo4mHdzUhkukGdbWfE2uhgLymgH5emC2F67MmIbqZdxHhOfsqpfBs7VDgvSxHdZ7Dhlgh/VD7cz0zkCzEk6FR+Id/mC0UDBMpuy7y5xD5VRAzevho2S120130LkUTzl7wJp0RZhvdhIirPPbTfB1nVYU6D+HRG/shrmJh/TiglG2UsRvsq3z1fHWfDTTOjg9Yj4mfNy0BbhdWvonS0lWNbTQtplgo8z4IkG+Bt75JD4XHzL7AYDQwt7+1rn3ycVNzPTURpx34lvfG0h2/s/FrjWTmc34GFXMYbVIRF/yASfLjMdHGS29yL8lwJdiXoi+yZWfCGzPafIvU9wP/OqPRQrXQWua+CeS3wZpJXT2sSVlAQPOecfkpVqYwSzTvbT20TLkUAOzLECbeTZtQx0FnHAZV8O4TEWL3bz80jAg+r43DJq9Y2sbCPfU9JByAQPVlC3uuylk7j7++I9Vil4kPce26xn5VeIn4gNH3KP3pD2UDNpsZ292Uj0LbsKrFRwMN10wn7SxD5Wym9N7O8mxB0iCAVtOe7q7cmVxIdKSt1YBfttkH2+h33eQ/AZK/K5+ezLFtx1HQEwF9fAqiXYc/dx3Ntc9k3nfBP+TOBUNRe33cD+vIU8H/uzrWoK9tswlVE3ldEOCoFmjpDtVF3zoFrn9EkTHEw9B8jtjbjvisn68gsh+IJa1qkxSwWnglPBqeBUcCo4FZwKTgWngmMUnK01wflaEzxQa4Ktk99XI3r7rJWyE8H2H6zWW7InEO7/SKSnx56K7vpHgAEAUQBJ+2WPUPoAAAAASUVORK5CYII="
            alt
          />
        </div>
        <div>
          <p>邀请好友注册APP，享多重好礼</p>
          <p>限时特惠，多邀多得</p>
        </div>
        <div style="width:10%">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <van-overlay :show="isShow" @click="isShow = false">
      <img
        @click.stop
        class="share_img"
        src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20209Cy56rkkZy1586317219.png"
        alt
      />
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
    }
  }
};
</script>

<style scoped>
.mine_share_container {
  width: 90%;
  margin: 20px auto;
}
.mine_share_box {
  width: 100%;
  height: 45px;
  background: linear-gradient(-90deg, #f2995a, #eb6100);
  border-radius: 25px;
  display: inline-flex;
}
.mine_share_box > div {
  height: 45px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: white;
}
.mine_share_box > div > p {
  width: 100%;
}
.share_icon {
  width: 45%;
}
.share_img {
  width: 90%;
  display: block;
  margin: 10% auto;
}
</style>