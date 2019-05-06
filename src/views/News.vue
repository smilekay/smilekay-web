<template>
  <div>
    <el-container>
      <el-aside width="100px">
        <el-menu>
          <el-menu-item index="1">头条</el-menu-item>
          <el-menu-item index="2">新闻</el-menu-item>
          <el-menu-item index="3">财经</el-menu-item>
          <el-menu-item index="4">体育</el-menu-item>
          <el-menu-item index="5">娱乐</el-menu-item>
          <el-menu-item index="6">军事</el-menu-item>
          <el-menu-item index="7">教育</el-menu-item>
          <el-menu-item index="8">科技</el-menu-item>
          <el-menu-item index="9">NBA</el-menu-item>
          <el-menu-item index="10">股票</el-menu-item>
          <el-menu-item index="11">星座</el-menu-item>
          <el-menu-item index="12">女性</el-menu-item>
          <el-menu-item index="13">健康</el-menu-item>
          <el-menu-item index="14">育儿</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "News"
  }
</script>

<style scoped>
  .el-aside {
    color: #333;
    text-align: center;
    position: absolute;
    top: 60px;
    bottom: 0;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    position: absolute;
    top: 60px;
    left: 100px;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  .el-menu-item{
    height: 30px;
    line-height: 30px;
  }
</style>
