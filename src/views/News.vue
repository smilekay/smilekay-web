<template>
  <div>
    <el-container>
      <el-aside class="news-el-aside" width="100px">
        <el-menu :default-active="index" @select="selectItems">
          <el-menu-item class="news-el-menu-item" index="1">头条</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="2">新闻</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="3">财经</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="4">体育</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="5">娱乐</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="6">军事</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="7">教育</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="8">科技</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="9">NBA</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="10">股票</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="11">星座</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="12">女性</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="13">健康</el-menu-item>
          <el-menu-item class="news-el-menu-item" index="14">育儿</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="news-el-main">
        <ul>
          <li v-for="n in data">
            <a :href="n.url">
              <span class="news-title">{{n.title}}</span>
              <p class="news-time"><span class="news-src">{{n.src}}</span>时间： {{n.time}}</p>
              <div class="news-pic">
                <img class="news-img" :src="n.pic"/>
                <div class="label-header">
                  <span class="mask">{{n.category}}</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </el-main>
      <BackToTop style="z-index: 9"/>
    </el-container>
  </div>
</template>

<script>
  import BackToTop from "../components/BackToTop";
  export default {
    name: "News",
    components: {BackToTop},
    data() {
      return {
        data: [
          {
            channel: '头条',
            title: '视频-《锦绣未央》被判抄袭 作者周静赔偿13万元',
            pic: 'https://p.ivideo.sina.com.cn/video/289/148/758/289148758.jpg',
            url: 'https://video.sina.cn/news/2019-05-08/detail-ihvhiews0562300.d.html?vt=4&pos=108',
            src: '新浪新闻',
            category: 'video',
            time: '2019-05-08 13:53:32'
          },
          {
            channel: '头条',
            title: '视频-《锦绣未央》被判抄袭 作者周静赔偿13万元',
            pic: 'https://p.ivideo.sina.com.cn/video/289/148/758/289148758.jpg',
            url: 'https://video.sina.cn/news/2019-05-08/detail-ihvhiews0562300.d.html?vt=4&pos=108',
            src: '新浪新闻',
            category: 'video',
            time: '2019-05-08 13:53:32'
          },
          {
            channel: '头条',
            title: '视频-《锦绣未央》被判抄袭 作者周静赔偿13万元',
            pic: 'https://p.ivideo.sina.com.cn/video/289/148/758/289148758.jpg',
            url: 'https://video.sina.cn/news/2019-05-08/detail-ihvhiews0562300.d.html?vt=4&pos=108',
            src: '新浪新闻',
            category: 'video',
            time: '2019-05-08 13:53:32'
          },
          {
            channel: '头条',
            title: '视频-《锦绣未央》被判抄袭 作者周静赔偿13万元',
            pic: 'https://p.ivideo.sina.com.cn/video/289/148/758/289148758.jpg',
            url: 'https://video.sina.cn/news/2019-05-08/detail-ihvhiews0562300.d.html?vt=4&pos=108',
            src: '新浪新闻',
            category: 'video',
            time: '2019-05-08 13:53:32'
          },
          {
            channel: '头条',
            title: '视频-《锦绣未央》被判抄袭 作者周静赔偿13万元',
            pic: 'https://p.ivideo.sina.com.cn/video/289/148/758/289148758.jpg',
            url: 'https://video.sina.cn/news/2019-05-08/detail-ihvhiews0562300.d.html?vt=4&pos=108',
            src: '新浪新闻',
            category: 'video',
            time: '2019-05-08 13:53:32'
          },
          {
            channel: '头条',
            title: '视频-《锦绣未央》被判抄袭 作者周静赔偿13万元',
            pic: 'https://p.ivideo.sina.com.cn/video/289/148/758/289148758.jpg',
            url: 'https://video.sina.cn/news/2019-05-08/detail-ihvhiews0562300.d.html?vt=4&pos=108',
            src: '新浪新闻',
            category: 'video',
            time: '2019-05-08 13:53:32'
          },
          {
            channel: '头条',
            title: '视频-《锦绣未央》被判抄袭 作者周静赔偿13万元',
            pic: 'https://p.ivideo.sina.com.cn/video/289/148/758/289148758.jpg',
            url: 'https://video.sina.cn/news/2019-05-08/detail-ihvhiews0562300.d.html?vt=4&pos=108',
            src: '新浪新闻',
            category: 'video',
            time: '2019-05-08 13:53:32'
          },
          {
            channel: '头条',
            title: '视频-《锦绣未央》被判抄袭 作者周静赔偿13万元',
            pic: 'https://p.ivideo.sina.com.cn/video/289/148/758/289148758.jpg',
            url: 'https://video.sina.cn/news/2019-05-08/detail-ihvhiews0562300.d.html?vt=4&pos=108',
            src: '新浪新闻',
            category: 'video',
            time: '2019-05-08 13:53:32'
          },
          {
            channel: '头条',
            title: '视频-《锦绣未央》被判抄袭 作者周静赔偿13万元',
            pic: 'https://p.ivideo.sina.com.cn/video/289/148/758/289148758.jpg',
            url: 'https://video.sina.cn/news/2019-05-08/detail-ihvhiews0562300.d.html?vt=4&pos=108',
            src: '新浪新闻',
            category: 'video',
            time: '2019-05-08 13:53:32'
          },
          {
            channel: '头条',
            title: '视频-《锦绣未央》被判抄袭 作者周静赔偿13万元',
            pic: 'https://p.ivideo.sina.com.cn/video/289/148/758/289148758.jpg',
            url: 'https://video.sina.cn/news/2019-05-08/detail-ihvhiews0562300.d.html?vt=4&pos=108',
            src: '新浪新闻',
            category: 'video',
            time: '2019-05-08 13:53:32'
          }
        ],
        news: {
          channel: '',
          title: '',
          pic: '',
          url: '',
          src: '',
          category: ''
        },
        index: '1'
      }
    },
    methods: {
      selectItems(index) {
        let channel = ''
        switch (index) {
          case '1':
            channel = '头条'
            break;
          case '2':
            channel = '新闻'
            break;
          case '3':
            channel = '财经'
            break;
          case '4':
            channel = '体育'
            break;
          case '5':
            channel = '娱乐'
            break;
          case '6':
            channel = '军事'
            break;
          case '7':
            channel = '教育'
            break;
          case '8':
            channel = '科技'
            break;
          case '9':
            channel = 'NBA'
            break;
          case '10':
            channel = '股票'
            break;
          case '11':
            channel = '星座'
            break;
          case '12':
            channel = '女性'
            break;
          case '13':
            channel = '健康'
            break;
          case '14':
            channel = '育儿'
            break;
        }
        this.$get("/news/get", {channel: channel}).then(response => {
          this.data = response.data
        }).catch(() => {
          this.$message.error('获取新闻信息失败,请稍后重试！');
        })
      }
    },
    mounted() {
      // this.$get("/news/get", {channel: '头条'}).then(response => {
      //   this.data = response.data
      // }).catch(() => {
      //   this.$message.error('获取新闻信息失败,请稍后重试！');
      // })
    }
  }
</script>
