<template>
  <div>
    <el-form :model="addForm" status-icon :rules="rules" ref="ruleForm3" label-width="100px" class="add-video-box">
      <h3 class="add-video-title">添加视频</h3>
      <el-form-item label="名称" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="addForm.title"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-autocomplete
          v-model=addForm.type
          :fetch-suggestions="querySearch1"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-autocomplete
          v-model=addForm.tag
          :fetch-suggestions="querySearch2"
          placeholder="多个标签以分号 ';' 分隔"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="主演" prop="actor">
        <el-input v-model="addForm.actor" placeholder="多个主演以分号 ';' 分隔"></el-input>
      </el-form-item>
      <el-form-item label="标识" prop="code">
        <el-input v-model="addForm.code"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea"
                  placeholder="请输入内容"
                  maxlength="100"
                  show-word-limit
                  v-model="addForm.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm3')">提交</el-button>
        <el-button @click="resetForm('ruleForm3')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "AddVideo",
    data() {
      return {
        addForm: {
          name: '',
          title: '',
          type: 0,
          tag: '',
          actor: '',
          code: '',
          remark: ''
        },
        list1: [],
        list2: [],
        rules: {
          name: [
            {required: true, message: '名称不可为空', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '标题不可为空', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '类型不可为空', trigger: 'blur'}
          ],
          tag: [
            {required: true, message: '标签不可为空', trigger: 'blur'}
          ],
          actor: [
            {required: true, message: '主演不可为空', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '标识不可为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      querySearch1(queryString, cb) {
        // 调用 callback 返回建议列表的数据
        cb(this.list1);
      },
      querySearch2(queryString, cb) {
        // 调用 callback 返回建议列表的数据
        cb(this.list2);
      },
      loadAll1() {
        return [
          {"value": "抖音"},
          {"value": "快手"},
          {"value": "秒拍"},
          {"value": "其他"}
        ];
      },
      loadAll2() {
        return [
          {"value": "搞笑"},
          {"value": "唱歌"},
          {"value": "跳舞"},
          {"value": "其他"}
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      submitForm(formName) {
        const self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const videoInfo = {
              name: this.addForm.name,
              title: this.addForm.title,
              type: 1,
              tag: this.addForm.tag,
              actor: this.addForm.actor,
              code: this.addForm.code,
              cover: 'none',
              remark: ''
            }
            this.$post('/video/save', videoInfo
            ).then(function () {
              self.$message.success('添加成功')
            }).catch(function (error) {
              if (error) {
                console.log('添加失败 error:' + error.message);
                self.$message.error('添加失败！');
              } else {
                self.$message.error('添加失败,请稍后重试！');
              }
            })
          } else {
            console.log('Error Submit!!');
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      this.list1 = this.loadAll1();
      this.list2 = this.loadAll2();
      this.$get('/video/name').then(response => {
        this.addForm.name = response.data
      }).catch(() => {
        this.$message.error('连接服务器失败,请稍后重试！');
      })
    }
  }
</script>

<style scoped>
  .add-video-box {
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

  .add-video-title {
    text-align: inherit;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
