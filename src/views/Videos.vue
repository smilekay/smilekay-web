<template>
    <div class="video-list">
      <el-input
        class="video-el-input"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        @keyup.enter="onSearch"
        v-model="input">
      </el-input>
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

<style scoped>
  .video-list {
    width: 100%;
    background-color: #373737;
    color: #333;
    position: relative;
    text-align: center;
    padding: 80px 0 50px;
  }

  .video-list ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 60px;
  }

  .video-list li {
    list-style: none;
    margin: 2px;
    width: 24%;
    padding: 5px 3px 0;
  }

  .video-list img {
    width: 100%;
    cursor: pointer;
  }

  .video-list h4 {
    color: #ecd1bb;
  }

  .video-list h4:hover {
    cursor: pointer;
  }

  @media (max-width: 960px) {
    .video-list li {
      list-style: none;
      margin: 20px 0;
      width: 80%;
    }
  }

  .video-cover {
    position: relative;
    display: block;
  }

  .video-el-input {
    position: absolute;
    width: 15%;
    right: 5%;
    top: 80px;
  }

  @media (max-width: 960px) {
    .video-el-input {
      position: absolute;
      width: 40%;
      right: 30%;
      top: 80px;
    }
  }

  .label-header {
    position: absolute;
    top: 5px;
    left: 5px;
    color: #fff;
    font-size: 14px;
    line-height: 1.42857143;
    font-weight: 900;
  }

  .label-bottom {
    position: absolute;
    left: 5px;
    bottom: 5px;
    color: #fff;
    font-size: 14px;
    line-height: 1.42857143;
    font-weight: 900;
  }
</style>
