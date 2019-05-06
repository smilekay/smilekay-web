<template>
  <div>
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
        <img class="icon" src="../assets/icon_qq.png" @click="onQQLogin"/>
        <a
          href="https://api.weibo.com/oauth2/authorize?client_id=4097946870&response_type=code&redirect_uri=http://www.smilekay.com/login"><img
          class="icon" src="../assets/icon_weibo.png"/></a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
            this.$router.push("/mall");
            sessionStorage.setItem('isLogin', 'true');
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
          redirectURI: "http://www.smilekay.com/login"
        });
      }
    },
    mounted: function () {
      if (!this.$route.query.code) {
        localStorage.setItem("code", this.$route.query.code)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: auto;
    padding: 15px 35px 15px 0;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    position: absolute;
    left: 35%;
    top: 20%;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
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

</style>
