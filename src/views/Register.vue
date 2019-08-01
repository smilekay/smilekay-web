<template>
  <div>
    <el-form id="background" class="background-style">
    </el-form>

    <el-form :model="regForm" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="register-box">
      <h3 class="register-title">注册</h3>
      <el-form-item label="名称">
        <el-input v-model="regForm.name"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="regForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" status-icon v-model="regForm.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="regForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="age">
        <el-input v-model.number="regForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {checkPassword} from '@/utils/Validate';
  import CanvasNest from 'canvas-nest.js';
  export default {
    data() {
      const validatorPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else {
          if (checkPassword(value)) {
            callback();
          } else {
            if (value.length < 8) {
              callback(new Error('密码长度不能少于8位'));
            } else {
              callback(new Error('密码必须包含数字和字母'));
            }
          }
        }
      };
      const validatorCheckPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.regForm.pass) {
          callback(new Error('两次输入密码不一致!'));
          console.log(value);
        } else {
          callback();
        }
      };
      return {
        regForm: {
          name: '',
          username: '',
          pass: '',
          checkPass: '',
          email: ''
        },
        rules2: {
          pass: [
            {validator: validatorPassword, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatorCheckPassword, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        const self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('userName:' + this.regForm.name + '\nloginCode:' + this.regForm.username + '\npassword:' + this.regForm.pass + '\nemail:' + this.regForm.email);
            const params1 = {
              userName: this.regForm.name,
              loginCode: this.regForm.username,
              password: this.regForm.pass,
              email: this.regForm.email
            }
            const params2 = {
              loginCode: this.regForm.username,
              password: this.regForm.pass
            }
            this.$post('/register', params1
            ).then(function (response) {
              console.log(response.message);
              self.$post('/login', params2
              ).then(function (res) {
                console.log(res.message);
                localStorage.setItem('token', res.data)
                self.$router.push('/mall')
              }).catch(function (error) {
                if (error) {
                  console.log('登录失败 error:' + error.message);
                } else {
                  console.log('连接服务器失败');
                }
              })
            }).catch(function (error) {
              if (error) {
                console.log('注册失败 error:' + error.message);
              } else {
                console.log('连接服务器失败');
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted: function () {
      const config = {
        color: 'F2, F6, FC', // 线条颜色
        pointColor: '255, 155, 0', // 节点颜色
        opacity: 0.8, // 线条透明度
        count: 120, // 线条数量
        zIndex: 199 // 画面层级
      };
      new CanvasNest(background, config);
    }
  }
</script>

<style scoped>
  .register-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: auto;
    padding: 15px 35px 15px 0;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    background: azure;
    position: absolute;
    left: 35%;
    top: 10%;
    z-index: 2;
  }

  .register-title {
    text-align: inherit;
    margin: 0 auto 40px auto;
    color: #303133;
  }

  .background-style {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
    background-image: url("../assets/background.png");
  }
</style>
