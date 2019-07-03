<template>
  <div>
    <el-form id="background" class="background-style">

    </el-form>
    <img class="image" src="../assets/asd.jpg"/>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username">
          <i slot="prepend" class="iconfont el-icon-smileyonghuming"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password">
          <i slot="prepend" class="iconfont el-icon-smilemima"/>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
        <el-button class="login-btn" @click="onClickRegister">注册</el-button>
      </el-form-item>
      <el-form-item>
        <!--QQ登录-->
        <svg aria-hidden="true"><use xlink:href="#el-icon-smileqq" @click="onQQLogin"/> </svg>

        <!--微博登录-->
        <a
          href="https://api.weibo.com/oauth2/authorize?client_id=4097946870&response_type=code&redirect_uri=http://www.smilekay.com/callback">
          <svg aria-hidden="true"><use xlink:href="#el-icon-smileweibo"/> </svg>
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
              console.log(res.message);
              localStorage.setItem('token', res.data)
              this.$router.push("/mall");
            }).catch(error => {
              if (error) {
                this.$message.error(error.message);
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
      const config = {
        color: 'F2, F6, FC', // 线条颜色
        pointColor: '255, 155, 0', // 节点颜色
        opacity: 0.5, // 线条透明度
        count: 120, // 线条数量
        zIndex: 199 // 画面层级
      };
      new CanvasNest(background, config);
    }
  }
</script>

<style lang="scss" scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 30%;
    padding: 15px 35px 15px 0;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    background: azure;
    position: absolute;
    top: 20%;
    left: 35%;
    right: 35%;
    z-index: 2;
  }

  .login-title {
    text-align: center;
    color: #303133;
  }

  .login-btn {
    margin: 0 30px 0 30px;
  }

  .image {
    height: 60px;
    width: 60px;
    opacity: 0.7;
    border-radius: 30px;
    transition: all 1s;
    position: absolute;
    left: 50%;
    top: 5%;
    z-index: 2;
  }

  .image:hover {
    opacity: 1;
    transform: scale(1.5) rotate(360deg);
  }

  .icon {
    height: 20px;
    width: 20px;
    border-radius: 10px;
    transition: all 0.5s;
    margin: 0 20px 0 20px;
  }

  .icon:hover {
    transform: scale(1.2);
    cursor: pointer;
  }

  .background-style {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
    background-image: url("../assets/background.png");
  }

  svg{
    height: 20px;
    width: 20px;
    border-radius: 10px;
    transition: all 0.5s;
    margin: 0 20px 0 20px;
  }

  svg:hover{
    transform: scale(1.2);
    cursor: pointer;
  }
</style>
