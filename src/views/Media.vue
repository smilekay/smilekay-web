<template>
  <div class="video-box-style">
    <el-row>
      <el-col :span="20">
        <h2 class="h2">{{video.title}}</h2>
        <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                      :options="playerOptions"></video-player>
      </el-col>
      <el-col :span="4">
        <div style="background: #ffffff;z-index: 3"/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="20">
        <h5 class="h5">
          <h5>播放次数：{{video.playCount}}</h5>
          <h5>主演：
            <a href="">{{video.actor}}</a>
          </h5>
          <h5>类型：
            <a href="">{{video.tag}}</a>
          </h5>
          <h5>上传者：{{video.createBy}}</h5>
          <h5>上传时间：{{video.createDate}}</h5>
          <div style="background: #f0f7ff;height: 1px;width: 95%;position: absolute;left: 2.5%"/>
        </h5>
      </el-col>
    </el-row>
    <el-row>
      <ul>
        <li v-for="v in similar" @click="onItemClick(v)">
          <img v-if="v.name!=video.name" :src="v.cover"/>
          <h4 v-if="v.name!=video.name">{{v.title}}</h4>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Media",
    data() {
      return {
        video: {
          src: '',
          name: '',
          title: '',
          tag: '',
          code: '',
          actor: '',
          cover: '',
          playCount: 0,
          createBy: '',
          createDate: ''
        },
        similar: [],
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          languages: {
            "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "视频加载时出错，请刷新页面重试"
          },
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "application/x-mpegURL",
            src: "https://haokan-sk.oss-cn-shanghai.aliyuncs.com/prev/" + this.$route.query.name + "/sk.m3u8" //视频url地址
          }],
          poster: "https://haokan-sk.oss-cn-shanghai.aliyuncs.com/prev/" + this.$route.query.name + "/cover.jpg",
          //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: true,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    methods: {
      onItemClick: function (v) {
        this.$router.push({path: '/video', query: {name: v.name}})
        this.$router.go(0)
      }
    },
    mounted: function () {
      const self = this;
      let name = this.$route.query.name
      this.video.src = "https://haokan-sk.oss-cn-shanghai.aliyuncs.com/prev/" + name + "/sk.m3u8"
      this.$refs.videoPlayer.player.src(this.video.src)
      this.$get('/video', {name: name}).then(response => {
        this.video.title = response.data.title
        this.video.actor = response.data.actor
        this.video.code = response.data.code
        this.video.cover = response.data.cover
        this.video.createBy = response.data.createBy
        this.video.createDate = response.createDate
        this.video.tag = response.data.tag
        this.video.playCount = response.data.playCount
        this.$refs.videoPlayer.player.poster = this.video.cover

        let url = '/video/page/1/8'
        this.$get(url, {tJson: {tag: this.video.tag, status: 0}}).then(response => {
          self.similar = response.data
        })
      }).catch(() => {
        this.$message.error('获取视频信息失败,请稍后重试！');
      })
    }
  }
</script>

<style scoped>
  .video-box-style {
    width: 100%;
    height: 100%;
    background-color: #454545;
    color: #333;
    text-align: center;
    position: fixed;
    overflow-y: scroll;
  }

  .video-player {
    width: 70%;
    margin-left: 15%;
    margin-top: 20px;
  }

  .h2 {
    text-align: left;
    width: 70%;
    margin-left: 15%;
    color: #f0f7ff;
  }

  .h5 {
    text-align: left;
    width: 70%;
    margin-left: 15%;
    color: #f0f7ff;
  }

  a {
    color: #f0f7ff;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
  }

  li {
    list-style: none;
    margin: 25px;
    width: 20%;
  }

  img {
    width: 100%;
    cursor: pointer;
  }

  h4 {
    color: #ecd1bb;
    cursor: pointer;
  }
</style>
