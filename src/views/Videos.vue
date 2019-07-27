<template>
  <div class="video-list-style">
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      @keyup.enter="onSearch"
      v-model="input">
    </el-input>
    <ul>
      <li v-for="v in pageInfo.data" @click="onItemClick(v)">
        <img :src="v.cover"/>
        <h4>{{v.title}}</h4>
      </li>
    </ul>
    <el-pagination
      background
      @current-change="onCurrentChanged"
      layout="prev, pager, next"
      :current-page.sync="pageInfo.currentPage"
      :pager-count="pageInfo.pagerCount"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.currentTotal"
      v-if="pageInfo.currentTotal!=0">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "Videos",
    data() {
      return {
        pageInfo: {
          currentPage: 1,//当前页码
          pageSize: 20,//每页展示的数据条数
          currentTotal: 0,//总条目数
          pagerCount: 6,//页码按钮的数量
          data: []
        },
        input: ''
      }
    },
    methods: {
      onItemClick: function (v) {
        this.$router.push({path: '/video', query: {name: v.name}})
      },
      onCurrentChanged: function (val) {
        this.getData(val)
      },
      onSearch: function () {
        console.log(this.input)
      },
      getData: function (val) {
        this.pageInfo.currentPage = val
        this.$router.push({path: '/videos', query: {page: val}})
        let url = '/video/page/' + val + '/' + this.pageInfo.pageSize
        this.$get(url, {tJson: {status: 0}}).then(response => {
          this.pageInfo.data = response.data
          this.pageInfo.currentTotal = response.cursor.total
        }).catch(() => {
          this.$message.error('获取视频信息失败,请稍后重试！');
        })
      }
    },
    mounted: function () {
      this.pageInfo.currentPage = this.$route.query.page === undefined ? 1 : this.$route.query.page
      this.getData(this.pageInfo.currentPage)
    }
  }
</script>

<style scoped>
  .video-list-style {
    width: 100%;
    background-color: #373737;
    color: #333;
    position: absolute;
    top: 60px;
    right: 0;
    z-index: 1;
    text-align: center;
  }

  .video-list-style ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
  }

  .video-list-style li {
    list-style: none;
    margin: 25px;
    width: 20%;
  }

  .video-list-style img {
    width: 100%;
  }

  .video-list-style img {
    cursor: pointer;
  }

  .video-list-style h4 {
    color: #ecd1bb;
  }

  .video-list-style h4:hover {
    cursor: pointer;
  }

  .el-pagination {
    position: absolute;
    bottom: 10px;
    right: 50px;
  }

  .el-input {
    position: absolute;
    width: 15%;
    left: 65px;
    top: 10px;
  }
</style>
