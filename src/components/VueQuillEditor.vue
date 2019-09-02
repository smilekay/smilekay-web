<template>
  <div class="quill-editor-block">
    <el-row>
      <el-col :span="18">
        <el-input
          small
          placeholder="请输入内容"
          v-model="title"></el-input>
      </el-col>
    </el-row>
    <el-row class="ql-head">
      <el-col :span="18">
        <quill-editor
          class="editor"
          ref="myTextEditor"
          v-model="content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          @change="onEditorChange($event)"/>
      </el-col>
    </el-row>
    <el-row class="ql-foot">
      <el-col :span="18">
        <el-button type="primary" @click="onPublish">发表</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "VueQuillEditor",
    data() {
      return {
        editorOption: {
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
              ["blockquote", "code-block"], // 引用  代码块
              [{header: 1}, {header: 2}], // 1、2 级标题
              [{list: "ordered"}, {list: "bullet"}], // 有序、无序列表
              [{script: "sub"}, {script: "super"}], // 上标/下标
              [{indent: "-1"}, {indent: "+1"}], // 缩进
              // [{'direction': 'rtl'}],                         // 文本方向
              [{size: ["small", false, "large", "huge"]}], // 字体大小
              [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
              [{color: []}, {background: []}], // 字体颜色、字体背景颜色
              [{font: []}], // 字体种类
              [{align: []}], // 对齐方式
              ["clean"], // 清除文本格式
              ["link", "image", "video"] // 链接、图片、视频
            ], //工具菜单栏配置
          },
          placeholder: '请在这里添加产品描述', //提示
          readyOnly: false, //是否只读
          theme: 'snow', //主题 snow/bubble
          syntax: true, //语法检测
        },
        title: '',
        content: '',
        introduce: ''
      }
    },
    methods: {
      onEditorBlur(editor) {
      },
      onEditorFocus(editor) {
      },
      onEditorReady(editor) {
      },
      onEditorChange(editor) {
        this.content = editor.html;
        this.introduce = editor.text;
      },
      onPublish: function () {
        if (this.title == '') {
          this.$message.error('标题不能为空');
        } else if (this.content == '') {
          this.$message.error('内容不能为空');
        } else {
          if (this.introduce.length > 30) {
            this.introduce = this.introduce.substr(0, 30);
          }
          this.$post('/article/save', {
            title: this.title,
            content: this.content,
            introduce: this.introduce
          }).then(response => {
            this.$message.info('发表成功！');
          }).catch(error => {
            this.$message.error('获取视频信息失败,请稍后重试！');
          })
        }
      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quillEditor;
      }
    }
  }
</script>

<style scoped>
  .editor {
    height: 200px;
  }

  .ql-head {
    margin: 10px 0;
  }

  .ql-foot {
    margin-top: 80px;
  }
</style>
