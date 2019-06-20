<template>
  <div id="home" class="home">
    <div class="home-left">
      <div class="articles">
        <h1>{{}}</h1>
      </div>
    </div>
    <div class="home-right">
      <div class="autherInfo">
        <div class="auther-picture">
          <img alt="auther照片" src="../assets/img/touxiang.jpg"/>
        </div>
        <div class="auther-fonts">
          <p>无聊的人日常做着无聊的事情</p>
          <p>一个除了吃睡玩，没有任何兴趣爱好的无聊人</p>
        </div>
        <div class="auther-words">
          <p>纵使疾风起，不言弃</p>
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
  import home_service from '../service/home.js'

  export default {
    name: 'home',
    data() {
      return {
        isCollapse: false
      };
    },
    mounted() {
      this.get_article_date();
    },
    created() {
    },
    methods: {
      // get article数据
      get_article_date() {
        debugger
        home_service.article().then(res => {
          console.log('请求数据成功');
        })
      },

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
