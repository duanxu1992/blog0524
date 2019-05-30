<template>
  <div id="home" class="blog_home">
    首页
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
  @import "../styles/homePage.scss";
</style>
