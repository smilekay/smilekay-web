<template>
  <el-container>
    <el-header>
      <el-menu default-active="1" mode="horizontal" background-color="#545c64" text-color="#fff"
               active-text-color="#ffd04b">
        <el-menu-item index="1" style="font-size: 15px" @click="onSelect('/mall')">在线商城</el-menu-item>
        <el-menu-item index="2" style="font-size: 15px">坚果 Pro 2S</el-menu-item>
        <el-menu-item index="3" style="font-size: 15px" @click="onSelect('/videos')">视频</el-menu-item>
        <el-menu-item index="4" style="font-size: 15px">应用</el-menu-item>
        <el-menu-item index="5" style="font-size: 15px">论坛</el-menu-item>
        <el-menu-item index="6" style="font-size: 15px" @click="onSelect('/news')">资讯</el-menu-item>
        <el-submenu index="7" style="position: absolute;right: 20px">
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
          <el-menu-item index="2-2" @click="onSelect('/help')"><i class="iconfont el-icon-smilebangzhu"/> 帮助
          </el-menu-item>
          <el-menu-item index="2-3" @click="onQuit"><i class="iconfont el-icon-smiledingbudaohang-zhangh"/> 退出
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>
      Copyright ©2019 smilekay加油
    </el-footer>
  </el-container>
</template>

<script>
  import '../assets/icon/iconfont'

  export default {
    name: "Main",
    data() {
      return {
        username: '',
        check: false,
        avatar: 'http://www.smilekay.com/poster/icon.png',
        integral: 0
      }
    },
    methods: {
      onQuit() {
        let token = localStorage.getItem('token')
        this.$get('/logout', {token: token}).then(response => {
          console.log(response.message);
          localStorage.clear();
          this.$router.push('/logout');
        }).catch(() => {
          this.$message.error('注销失败,请稍后重试！');
        })
      },
      onSelect(path) {
        this.$router.push(path);
      },
      onAttend() {
        let token = localStorage.getItem('token')
        this.$get('/user/sign', {token: token}).then(response => {
          this.$message.success(response.message + " 积分+1")
          this.check = true;
          this.integral += 1
        }).catch(() => {
          this.$message.error('签到失败,请稍后重试！');
        })
      }
    },
    mounted: function () {
      let token = localStorage.getItem('token')
      this.$get('/user/get_user_info', {token: token}).then(response => {
        this.username = response.data.username
        this.check = response.data.check
        if (response.data.avatar != null) {
          this.avatar = response.data.avatar
        }
        this.integral = response.data.integral
      }).catch(() => {
        this.$message.error('获取用户信息失败,请稍后重试！');
      })
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
    padding-bottom: 60px;
  }

  .el-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    color: #333;
    text-align: center;
    line-height: 60px;
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
