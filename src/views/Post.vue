<template>
  <div style="background-color: #dceffe;width: 100%;margin: 0 auto;position: absolute;top: 0">
    <div>
      <img style="width: 70%" src="../../static/images/default_head.jpg"/>
    </div>
    <div style="width: 70%;margin: -20px auto 20px auto;background-color: #fafbfc">
      <ul style="padding-top: 10px;list-style: none">
        <li>
          <el-row>
            <el-col :span="6">
              <ul class="p_author">
                <li>
                  <el-image
                    style="width: 100px; height: 100px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="cover"></el-image>
                </li>
                <li style="margin: 10px auto">
                  <span>smilekay</span>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use xlink:href="#el-icon-smilechuangxiangqingtongvip"/>
                  </svg>
                </li>
              </ul>
            </el-col>
            <el-col :span="18">
              <div class="p_content_main">
                <span class="p_content">huhu</span>
              </div>
              <div class="core_reply">
                <div class="p_reply"><a href="#" class="lzl_link_unfold">回复</a><span
                  class="lzl_link_fold" style="display:none">收起回复</span></div>
                <ul class="p_tail">
                  <li><span>5楼</span></li>
                  <li><span>2019-09-12 16:38</span></li>
                </ul>
                <ul class="props_appraise_wrap"></ul>
              </div>
            </el-col>
          </el-row>
          <div class="divider"></div>
        </li>
        <li>
          <el-row>
            <el-col :span="6">
              <ul class="p_author">
                <li>
                  <el-image
                    style="width: 100px; height: 100px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="cover"></el-image>
                </li>
                <li style="margin: 10px auto">
                  <span>smilekay</span>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use xlink:href="#el-icon-smilechuangxiangqingtongvip"/>
                  </svg>
                </li>
              </ul>
            </el-col>
            <el-col :span="18">
              <div class="p_content_main">
                <span class="p_content">huhu</span>
              </div>
            </el-col>
          </el-row>
          <div class="divider"></div>
        </li>
        <li>
          <el-row>
            <el-col :span="6">
              <ul class="p_author">
                <li>
                  <el-image
                    style="width: 100px; height: 100px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="cover"></el-image>
                </li>
                <li style="margin: 10px auto">
                  <span>smilekay</span>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use xlink:href="#el-icon-smilechuangxiangqingtongvip"/>
                  </svg>
                </li>
              </ul>
            </el-col>
            <el-col :span="18">
              <div class="p_content_main">
                <span class="p_content">huhu</span>
              </div>
            </el-col>
          </el-row>
          <div class="divider"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Post"
  }
</script>

<style scoped>
  svg {
    height: 30px;
    width: 150px;
  }

  .p_author {
    list-style: none;
    padding-top: 24px;
  }

  .p_content_main {
    background: #fff;
    min-height: 170px;
    padding: 24px 20px;
  }

  .p_content {
    line-height: 24px;
    font-size: 15px;
    word-wrap: break-word;
    padding: 24px 20px 0 0;
  }

  .divider {
    background-color: #DCDFE6;
    height: 1px;
  }

  .core_reply {
    background: #fff;
    position: relative;
    line-height: 28px;
    height: 28px;
    font-size: 12px;
  }

  .p_reply{
    float: right;
    margin-left: 6px;
  }

  .lzl_link_unfold{
    text-decoration: none;
  }

  .p_tail{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    float: right;
    color: #999;
    padding: 0 5px;
  }

  .p_tail li{
    margin: 0 5px;
  }
</style>
