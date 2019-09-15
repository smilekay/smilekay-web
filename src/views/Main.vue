<template>
  <el-container>
    <el-header>
      <el-menu default-active="1" mode="horizontal" background-color="#545c64" text-color="#fff"
               active-text-color="#ffd04b" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">视频</el-menu-item>
        <el-menu-item index="3">论坛</el-menu-item>
        <el-menu-item index="4">资讯</el-menu-item>
        <el-submenu index="5" style="float: right" v-if="islogin">
          <template slot="title"><img :src="avatar"/></template>
          <el-menu-item index="2-0" style="height: 120px">
            <el-row>
              <el-col style="text-align: center">
                <svg aria-hidden="true">
                  <use v-if="integral<20" xlink:href="#el-icon-smilechuangxiangqingtongvip"/>
                  <use v-else-if="integral<40" xlink:href="#el-icon-smilechuangxiangbaiyinvip"/>
                  <use v-else-if="integral<60" xlink:href="#el-icon-smilechuangxianghuangjinvip"/>
                  <use v-else-if="integral<80" xlink:href="#el-icon-smilechuangxiangzijinvip"/>
                  <use v-else-if="integral<100" xlink:href="#el-icon-smilechuangxiangzuanshivip"/>
                  <use v-else-if="integral<999" xlink:href="#el-icon-smilehuaban"/>
                  <use v-else xlink:href="#el-icon-smileicon-test"/>
                </svg>
                {{username}}
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-col style="text-align: center">积分:{{integral}}</el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-if="check" style="text-align: center">已签到</el-col>
              <el-col v-else style="text-align: center">
                <svg aria-hidden="true" @click="onAttend" style="height: 40px">
                  <use xlink:href="#el-icon-smileqiandao"/>
                </svg>
                ←点我签到
              </el-col>
            </el-row>
          </el-menu-item>
          <el-menu-item index="2-1"><i class="iconfont el-icon-smileiconfront-"/> 个人中心</el-menu-item>
          <el-menu-item index="2-2"><i class="iconfont el-icon-smilebangzhu"/> 帮助
          </el-menu-item>
          <el-menu-item index="2-3" @click="onQuit"><i class="iconfont el-icon-smiledingbudaohang-zhangh"/> 退出
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="6" style="float: right" v-else>
          <svg aria-hidden="true" class="home">
            <use xlink:href="#el-icon-smiledenglu"/>
          </svg>
          登陆
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <BackToTop/>
  </el-container>
</template>

<script>
  import '../assets/icon/iconfont'
  import BackToTop from "../components/BackToTop";

  export default {
    name: "Main",
    components: {BackToTop},
    data() {
      return {
        username: '',
        check: false,
        avatar: 'http://www.smilekay.com/poster/icon.png',
        integral: 0,
        islogin: false
      }
    },
    methods: {
      onQuit() {
        this.$get('/logout').then(response => {
          console.log(response.message);
          this.$store.dispatch('asyncUpdateUser', null)
          this.$router.push('/login');
        }).catch(() => {
          this.$message.error('注销失败,请稍后重试！');
        })
      },
      handleSelect(index, indexPath) {
        let path = '';
        switch (index) {
          case '1':
            path = '/mall';
            break;
          case '2':
            path = '/videos';
            break;
          case '3':
            path = '/forum';
            break;
          case '4':
            path = '/news';
            break;
          case '6':
            path = '/login';
            break;
          case '2-1':

            break;
          case '2-2':
            path = '/help';
            break;
        }
        if (path == '/videos') {
          let user = this.$store.getters.getUser
          let str = sessionStorage.getItem('vuex');
          if (str != null && user != null) {
            this.$router.push(path);
          } else {
            this.$message.warning('亲，登陆后可观看视频哦！')
          }
        } else {
          this.$router.push(path);
        }
      },
      onAttend() {
        this.$get('/user/sign').then(response => {
          this.$message.success(response.message + " 积分+1")
          this.check = true;
          this.integral += 1
          let user = this.$store.getters.getUser
          user.check = this.check
          user.integral = this.integral
          this.$store.dispatch('asyncUpdateUser', user)
        }).catch(() => {
          this.$message.error('签到失败,请稍后重试！');
        })
      }
    },
    mounted: function () {
      let user = this.$store.getters.getUser
      let str = sessionStorage.getItem('vuex');
      if (str != null && user != null) {
        this.islogin = true;
        this.username = user.userName;
        this.check = user.check;
        this.avatar = user.avatar;
        this.integral = user.integral;
      } else {
        this.$get('/user/get_user_info').then(response => {
          console.log('get_user_info user: ' + response.data.userName);
          this.islogin = true
          this.username = response.data.userName
          this.check = response.data.check
          if (response.data.avatar != null) {
            this.avatar = response.data.avatar
          }
          this.integral = response.data.integral
          this.$store.dispatch('asyncUpdateUser', response.data)
        }).catch(() => {
          console.log('用户未登录')
        })
      }
    }
  }
</script>

<style type="text/css" scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .el-header {
    width: 100%;
    background-color: #545c64;
    color: #333;
    text-align: right;
    line-height: 60px;
    position: fixed;
    top: 0;
    z-index: 2;
  }

  .el-main {
    overflow: unset;
    padding: 0px;
  }

  .el-container {
    height: 100%;
  }

  img {
    height: 30px;
    width: 30px;
    opacity: 0.7;
    border-radius: 15px;
  }

  svg {
    height: 25px;
    width: 50px;
  }
</style>
