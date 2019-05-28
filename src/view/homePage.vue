<template>
  <div id="home" class="blog_home">
    <div class="nav">
      <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
      <!--<el-radio-button :label="false">展开</el-radio-button>-->
      <!--<el-radio-button :label="true">收起</el-radio-button>-->
      <!--</el-radio-group>-->
      <!--<div @click="meunButton" class="menuButton">-->
      <!--<i :class="isCollapse?'iconfont icon-shouqianniuicon' :'iconfont icon-zhankaianniuicon'"></i>-->
      <!--</div>-->
      <el-menu default-active="" mode="horizontal" class="el-menu-vertical-demo" @open="handleOpen"
               @close="handleClose"
               :collapse="isCollapse">

        <div v-for="(item,index) in menu" :index="index" class="menu-div">
          <!-- 一级菜单-->
          <el-menu-item v-if="item.menus.length===0">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{item.name}}</span>
            </template>
          </el-menu-item>
          <!--二级菜单-->
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        isCollapse: false,
        menu: [
          {name: '首页', menuPath: '/home', icon: '', menus: []},
          {name: '分类', menuPath: '/category', icon: '', menus: []},
          {name: '关于', menuPath: '/about', icon: '', menus: []}
        ],
      };
    },
    methods: {
      meunButton() {
        this.isCollapse = !this.isCollapse;
      },
      handleOpen(key, keyPath) {
        debugger
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss">
  .blog_home {
    height: 100%;
    width: 100%;
    .nav {
      position: absolute;
      left: 0;
      top: 0;
      width: 500px;
      height: 60px;
      .menuButton {
        position: absolute;
        width: 30px;
        height: 30px;
        right: -30px;
      }
      .menu-div {
        width: 100px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }

  /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
