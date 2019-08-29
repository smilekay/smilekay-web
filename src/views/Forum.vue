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
              <ul style="list-style: none;padding-inline-start: inherit;">
                <li>
                  <el-row>
                    <el-col :span="3">
                      <div style="background: #9d9d9d;height: 100px"></div>
                    </el-col>
                    <el-col :span="21">
                      <div style="background: #43a047;height: 100px"></div>
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
