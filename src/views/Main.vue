<template>
  <el-container>
    <el-header>
      <el-menu default-active="1" mode="horizontal" background-color="#545c64" text-color="#fff"
               active-text-color="#ffd04b">
        <el-menu-item index="1" style="font-size: 15px" @click="onSelect('/mall')">在线商城</el-menu-item>
        <el-menu-item index="2" style="font-size: 15px" @click="onSelect('/mall2')">坚果 Pro 2S</el-menu-item>
        <el-menu-item index="3" style="font-size: 15px" @click="onSelect('/mall3')">坚果 R1</el-menu-item>
        <el-menu-item index="4" style="font-size: 15px">应用</el-menu-item>
        <el-menu-item index="5" style="font-size: 15px">论坛</el-menu-item>
        <el-menu-item index="6" style="font-size: 15px" @click="onSelect('/news')">资讯</el-menu-item>
        <el-submenu index="7" style="position: absolute;right: 20px">
          <template slot="title"><img src="../assets/asd.jpg"/></template>
          <el-menu-item index="2-1">个人中心</el-menu-item>
          <el-menu-item index="2-2">帮助</el-menu-item>
          <el-menu-item index="2-3" @click="onQuit">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <router-view/>
  </el-container>
</template>

<script>
  export default {
    name: "Main",
    methods: {
      onQuit() {
        sessionStorage.clear();
        this.$router.push('/logout');
      },
      onSelect(path){
        this.$router.push(path);
      }
    }
  }
</script>

<style scoped>
  .el-header {
    width: 100%;
    background-color: #545c64;
    color: #333;
    text-align: right;
    line-height: 60px;
    position: fixed;
    top: 0;
    z-index: 2;
  }

  .el-container {
    height: 100%;
  }

  img {
    height: 30px;
    width: 30px;
    opacity: 0.7;
    border-radius: 15px;
  }
</style>
