<template>
  <div class="quill-editor-block">
    <el-upload
      class="avatar-uploader"
      :action="serverUrl"
      name="file"
      :show-file-list="false"
      list-type="picture"
      multiple
      :on-success="uploadSuccess">
    </el-upload>
    <el-row>
      <el-col :span="18">
        <el-input
          small
          placeholder="请输入标题"
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
            toolbar: {
              container: toolbarOptions,
              handlers: {
                image: function (value) {
                  if (value) {
                    console.log("value = " + value)
                    document.querySelector(".avatar-uploader input").click();
                  } else {
                    this.quill.format("image", false);
                  }
                }
              }
            },
          },
          placeholder: '你想说点什么',
          readyOnly: false,
          theme: 'snow',
          syntax: true,
        },
        serverUrl: 'http://www.oss.smilekay.com/prev/',
        title: '',
        content: ''
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
        console.log(this.content)
      },
      uploadSuccess(res, file) {

      },
      onPublish: function () {
        let user = this.$store.getters.getUser
        let str = sessionStorage.getItem('vuex');
        if (str != null && user != null) {
          if (this.title == '') {
            this.$message.error('标题不能为空');
          } else if (this.content == '') {
            this.$message.error('内容不能为空');
          } else {
            this.$post('/article/save', {
              title: this.title,
              content: this.content
            }).then(response => {
              this.$message.success('发表成功！');
            }).catch(error => {
              this.$message.error('发表失败！');
            })
          }
        }else {
          this.$message.warning('亲，登陆后才能发帖哦！');
        }
      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quillEditor;
      }
    }
  }

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{header: 1}, {header: 2}],
    [{list: "ordered"}, {list: "bullet"}],
    [{script: "sub"}, {script: "super"}],
    [{indent: "-1"}, {indent: "+1"}],
    [{size: ["small", false, "large", "huge"]}],
    [{header: [1, 2, 3, 4, 5, 6, false]}],
    [{color: []}, {background: []}],
    [{font: []}],
    [{align: []}],
    ["clean"],
    ["link", "image", "video"]
  ]
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
