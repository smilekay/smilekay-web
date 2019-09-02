<template>
  <div class="skin_normal">
    <div class="forum-wrap">
      <div class="forum-header">
        <div class="card_banner">
          <img style="width: 100%" src="../../static/images/default_head.jpg"/>
        </div>
      </div>
      <div class="forum-content">
        <el-row>
          <el-col :span="18">
            <div class="forum-content-list">
              <ul class="forum-content-ul">
                <li class="forum-content-li" v-for="f in pageInfo.data">
                  <el-row>
                    <el-col :span="3">
                      <span class="thread_list_rep_num" title="回复">{{f.replyCount}}</span>
                    </el-col>
                    <el-col :span="21">
                      <el-row>
                        <el-col :span="18">
                          <div class="left">
                            <span class="hd put_top_font" v-if="f.top == 1">置顶</span>
                            <el-link type="primary" href="/mall?f=f.id" target="_blank">{{f.title}}
                            </el-link>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <span class="thread_list_author left" title="主题作者"><i
                            class="el-icon-s-custom"/>{{f.userName}}</span>
                        </el-col>
                        <el-col :span="2">

                        </el-col>
                      </el-row>
                      <el-row style="margin-top: 10px">
                        <el-row>
                          <el-col :span="18">
                            <div class="left">
                              <span class="thread_list_abs">{{f.content}}</span>
                            </div>
                          </el-col>
                          <el-col :span="4">
                            <span class="thread_list_author left" title="最后回复人"><i class="el-icon-chat-dot-round"/> {{f.replyName}}</span>
                          </el-col>
                          <el-col :span="2">
                            <span class="thread_list_author left" title="最后回复时间">{{f.updateDate}}</span>
                          </el-col>
                        </el-row>
                        <el-row>
                          <ul class="thread_list_abs_img_ul">
                            <li class="left">
                              <el-image class="thread_list_abs_img margin_small" :src="url"
                                        :preview-src-list="srcList"/>
                            </li>
                            <li class="left">
                              <el-image class="thread_list_abs_img margin_small"
                                        src="https://p1.pstatp.com/large/17e600002f02f0804a364.jpg"
                                        :preview-src-list="srcList"/>
                            </li>
                          </ul>
                        </el-row>
                      </el-row>
                    </el-col>
                  </el-row>
                </li>
              </ul>
              <el-pagination
                small
                @current-change="onCurrentChanged"
                layout="prev, pager, next"
                :current-page.sync="pageInfo.currentPage"
                :pager-count="pageInfo.pagerCount"
                :page-size="pageInfo.pageSize"
                :total="pageInfo.currentTotal"
                v-if="pageInfo.currentTotal!=0">
              </el-pagination>
            </div>
          </el-col>
          <el-col :span="6" :offset="18">

          </el-col>
        </el-row>
        <ul class="aside_float_bar">
          <li class="aside_float_bar_item">
            <el-tooltip effect="light" content="发帖" placement="bottom">
              <svg class="icon" aria-hidden="true" @click="toBottom">
                <use xlink:href="#el-icon-smilelunkuodasan-1"/>
              </svg>
            </el-tooltip>
          </li>
        </ul>
      </div>
      <div class="forum-foot">
        <VueQuillEditor/>
      </div>
    </div>
  </div>
</template>

<script>
  import VueQuillEditor from "../components/VueQuillEditor";

  export default {
    name: "Forum",
    components: {VueQuillEditor},
    data() {
      return {
        pageInfo: {
          currentPage: 1,
          pageSize: 20,
          currentTotal: 0,
          pagerCount: 6,
          data: []
        },
        url: 'https://p1.pstatp.com/large/289a00005b6b3c0ecfd68.jpg',
        srcList: [
          'https://p1.pstatp.com/large/289a00005b6b3c0ecfd68.jpg',
          'https://p1.pstatp.com/large/17e600002f02f0804a364.jpg'
        ]
      }
    },
    methods:{
      onCurrentChanged: function (val) {
        this.getData(val)
      },
      getData: function (val) {
        this.pageInfo.currentPage = val
        this.$router.push({path: '/forum', query: {page: val}})
        let url = '/article/page/' + val + '/' + this.pageInfo.pageSize
        this.$get(url, null).then(response => {
          this.pageInfo.data = response.data
          this.pageInfo.currentTotal = response.cursor.total
        }).catch(error => {
          this.$message.error('获取视频信息失败,请稍后重试！');
        })
      },
      toBottom: function () {
        凯哥酒楼：桂林市灵川大道25
      }
    },
    mounted: function () {
      this.pageInfo.currentPage = undefined === this.$route.query.page ? 1 : this.$route.query.page
      this.getData(this.pageInfo.currentPage)
    }
  }
</script>

<style scoped>

</style>
