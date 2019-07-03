<template>
    <div>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1">
              <el-menu-item index="1" @click="onSelect('/contact')">联系我</el-menu-item>
              <el-menu-item index="2">积分等级</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "Help",
      methods:{
        onSelect(path) {
          this.$router.push(path);
        }
      }
    }
</script>

<style scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    position: absolute;
    top: 60px;
  }

  .el-main {
    color: #333;
    position: absolute;
    top: 60px;
    left: 200px;
    margin-left: 10px;
    z-index: 1;
  }
</style>
