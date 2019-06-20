<template>
  <div id="main" class="blog_home">
    <div class="nav">
      <el-menu :router="true" active-text-color="#ff25a8" default-active="/home" mode="horizontal"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               :collapse="isCollapse">
        <div v-for="(item,index) in menu" :index="item.menuPath" class="menu-div">
          <!-- 一级菜单-->
          <el-menu-item v-if="item.menus.length===0" :index="item.menuPath">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
          </el-menu-item>
          <!--二级菜单-->
        </div>
      </el-menu>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'mains',
    data() {
      return {
        isCollapse: false,
        menu: [
          {name: '首页', menuPath: '/home', icon: 'iconfont  icon-daohanglan-03', menus: []},
          {name: '分类', menuPath: '/category', icon: 'iconfont  icon-nav003', menus: []},
          {name: '关于', menuPath: '/about-auther', icon: 'iconfont  icon-tiantianquan', menus: []}
        ],
      };
    },
    mounted() {
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
