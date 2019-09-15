<template>
  <div class="video-box">
    <el-page-header class="media-header" @back="goBack">
    </el-page-header>
    <el-row>
      <el-col :span="14" :offset="3">
        <h2 class="media-name">{{video.title}}</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="3">
        <div class="play-box">
          <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                        :options="playerOptions"
                        @play="onPlayerPlay($event)"
                        @pause="onPlayerPause($event)"/>
          <div class="unlock-msg" v-if="pause">
            <p>
              加入会员，观看完整视频
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="video-plan">
          <div class="video-plan-name">看完整版并解锁全站視頻</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <h5 class="media-h5">
          <h5>播放次数：{{video.playCount}}</h5>
          <h5>主演：
            <a class="media-a" href="">{{video.actor}}</a>
          </h5>
          <h5>标签：
            <a class="media-a" href="">{{video.tag}}</a>
          </h5>
          <h5>上传时间：{{video.createDate}}</h5>
        </h5>
      </el-col>
    </el-row>
    <div class="media-similar">
      <h2>相关视频</h2>
    </div>
    <el-row>
      <ul class="media-similar-list">
        <li v-for="v in similar" @click="onItemClick(v)">
          <img class="media-img" :src="v.cover"/>
          <h4 class="media-h4">{{v.title}}</h4>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "MyMedia",
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
        pause: false,
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
            src: "http://www.oss.smilekay.com/v/" + this.$route.query.name + "/sk.m3u8" //视频url地址
          }],
          poster: "http://www.oss.smilekay.com/prev/" + this.$route.query.name + "/cover.jpg",
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
        this.$router.push({path: '/av', query: {name: v.name}})
        this.$router.go(0)
      },
      onPlayerPlay(player) {
        this.pause = false;
      },
      onPlayerPause(player) {
        this.pause = true;
      },
      goBack() {
        let page = sessionStorage.getItem("page");
        this.$router.push({path: '/admin', query: {page: page}});
      }
    },
    mounted: function () {
      const self = this;
      let name = this.$route.query.name
      this.video.src = "http://www.oss.smilekay.com/v/" + name + "/sk.m3u8"
      this.$refs.videoPlayer.player.src(this.video.src)
      this.$get('/video', {name: name}).then(response => {
        console.log('video: ' + response.data.createDate);
        const video = response.data
        this.video.title = video.title
        this.video.actor = video.actor
        this.video.code = video.code
        this.video.cover = video.cover
        this.video.createBy = video.createBy
        this.video.createDate = video.createDate.substr(0, 10)
        this.video.tag = video.tag
        this.video.playCount = video.playCount
        this.$refs.videoPlayer.player.poster = this.video.cover

        let url = '/video/page/1/8'
        this.$get(url, {tJson: {tag: this.video.tag, status: 0}}).then(response => {
          response.data.forEach(function (val) {
            if (val.title == self.video.title) {
              let i = response.data.indexOf(val)
              response.data.splice(i, 1)
            }
          })
          self.similar = response.data
        })
      }).catch(() => {
        this.$message.error('获取视频信息失败,请稍后重试！');
      })
    }
  }
</script>
