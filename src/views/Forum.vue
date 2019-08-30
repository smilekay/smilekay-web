<template>
  <div class="skin_normal">
    <div class="forum-wrap">
      <div class="forum-header">
        <div class="card_banner">
          <img style="width: 100%" src="../../static/images/default_head.jpg"/>
        </div>
      </div>
      <div class="forum-content" style="height: 800px">
        <el-row>
          <el-col :span="18">
            <div class="forum-content-list">
              <ul class="forum-content-ul">
                <li class="forum-content-li">
                  <el-row>
                    <el-col :span="3">
                      <span class="thread_list_rep_num" title="回复">999</span>
                    </el-col>
                    <el-col :span="21">
                      <el-row>
                        <el-col :span="16">
                          <div class="left">
                            <span class="hd">置顶</span>
                            <el-link type="primary" href="/mall" target="_blank">【吧务】2019年8月吧友求职等相关信息专贴</el-link>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <span class="thread_list_author" title="主题作者"><i class="el-icon-s-custom"/> smilekay</span>
                        </el-col>
                        <el-col :span="4">
                          <i class="el-icon-s-custom"/>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col></el-col>
                        <el-col></el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="6" :offset="18">

          </el-col>
        </el-row>
        <ul class="aside_float_bar">
          <li class="aside_float_bar_item">
            <el-tooltip effect="light" content="发帖" placement="bottom">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#el-icon-smilelunkuodasan-1" @click="onQQLogin"/>
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
    components: {VueQuillEditor}
  }
</script>

<style scoped>

</style>
