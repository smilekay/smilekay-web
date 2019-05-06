<template>
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
</template>

<script>
  import {checkPassword} from '@/utils/Validate';

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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
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
    position: absolute;
    left: 35%;
    top: 10%;
  }

  .register-title {
    text-align: inherit;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
