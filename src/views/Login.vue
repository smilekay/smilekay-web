<template>
  <div>
    <el-form id="background" class="login-background">
    </el-form>
    <a href="/mall"> <svg aria-hidden="true" class="login-to-home"><use xlink:href="#el-icon-smileziyuan"/> </svg></a>
    <svg aria-hidden="true" class="login-icon"><use xlink:href="#el-icon-smilezhangyu1"/> </svg>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username">
          <i slot="prepend" class="iconfont el-icon-smileyonghuming"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password">
          <i slot="prepend" class="iconfont el-icon-smilemima"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
        <el-button class="login-btn" @click="onClickRegister">注册</el-button>
      </el-form-item>
      <el-form-item>
        <!--QQ登录-->
        <svg class="login-svg" aria-hidden="true"><use xlink:href="#el-icon-smileqq" @click="onQQLogin"/> </svg>

        <!--微博登录-->
        <a
          href="https://api.weibo.com/oauth2/authorize?client_id=4097946870&response_type=code&redirect_uri=http://www.smilekay.com/callback">
          <svg class="login-svg" aria-hidden="true"><use xlink:href="#el-icon-smileweibo"/> </svg>
        </a>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import CanvasNest from 'canvas-nest.js';
  import '../assets/icon/iconfont'

  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: '',
          password: ''
        },

        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        const params = {
          loginCode: this.form.username,
          password: this.form.password
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post('/login', params
            ).then(res => {
              console.log(res.data)
              this.$store.dispatch('asyncUpdateUser', res.data)
              this.$router.push("/mall");
            }).catch(error => {
              if (error.data) {
                this.$message.error(error.data.message);
              } else {
                this.$message.error('连接服务器失败,请稍后重试！');
              }
            })
          } else {
            return false;
          }
        });
      },
      onClickRegister() {
        this.$router.push('/register');
      },
      onQQLogin() {
        QC.Login.showPopup({
          appId: "101571153",
          redirectURI: "http://www.smilekay.com/callback"
        });
      }
    },
    mounted: function () {
      let user = this.$store.getters.getUser
      let str = sessionStorage.getItem('vuex');
      if (str != null && user != null) {
        this.$message.info('亲爱的' + user.username + ',您已经登录过了哦！');
        this.$router.push({path: '/mall'})
      }
      const config = {
        color: 'F2, F6, FC', // 线条颜色
        pointColor: '255, 155, 0', // 节点颜色
        opacity: 0.8, // 线条透明度
        count: 199, // 线条数量
        zIndex: 199 // 画面层级
      };
      new CanvasNest(background, config);
    }
  }
</script>
