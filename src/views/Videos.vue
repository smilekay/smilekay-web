<template>
  <div class="video-list">
    <el-input
      class="video-el-input"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      @keyup.enter="onSearch"
      v-model="input">
    </el-input>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100">
    </el-pagination>
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
    <ul>
      <li v-for="v in pageInfo.data" @click="onItemClick(v)">
        <div class="video-cover">
          <img :src="v.cover"/>
          <div class="label-header">
            <span class="hd">{{v.tag}}</span>
            <span class="mask" v-if="v.mask == 0">无码</span>
          </div>
          <div class="label-bottom">
            <span class="new" v-if="(new Date()).getTime() - new Date(v.createDate.substr(0,10)).getTime() < 86400000">本日上传</span>
            <span class="captions" v-if="v.captions == 1">中文字幕</span>
          </div>
        </div>
        <h4>{{v.title}}</h4>
      </li>
    </ul>
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
        sessionStorage.setItem("page", this.pageInfo.currentPage)
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
        }).catch(error => {
          if (error.data.data == 1) {
            this.$message.error('亲，登陆后可观看视频哦！');
            history.go(-2);
            // this.$router.push({path: '/login', query: {portal: error.headers.redirect_url}})
          } else {
            this.$message.error('获取视频信息失败,请稍后重试！');
          }
        })
      }
    },
    mounted: function () {
      this.pageInfo.currentPage = undefined === this.$route.query.page ? 1 : this.$route.query.page
      this.getData(this.pageInfo.currentPage)
    }
  }
</script>
