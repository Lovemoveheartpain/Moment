<template>
  <div></div>
</template>

<script>
import { bus } from "../network";
export default {
  data() {
    return {
      id: this.$route.query.id,
      teacherItem: {},
      inviteList: []
    };
  },
  methods: {
    getTeacher() {
      bus
        .getTeacher(this.id)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.teacherItem = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getReserve() {
      bus
        .invite(this.id)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.inviteList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // this.getTeacher();
    // this.getReserve();
  }
};
</script>

<style scoped>
</style>