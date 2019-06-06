<template>
  <div id="home" class="home">
    <div class="home-left">

    </div>
    <div class="home-right">
      <div class="autherInfo">
        <div class="autherPicture">
          <img alt="auther照片" src="../assets/img/touxiang.jpg"/>
        </div>
      </div>
      <div>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'home',
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      meunButton() {
        this.isCollapse = !this.isCollapse;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/home.scss";
</style>
