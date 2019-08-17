<template>
  <div v-loading="loading" element-loading-text="登陆中..." element-loading-spinner="el-icon-loading">
  </div>
</template>

<script>
  export default {
    name: "Callback",
    data() {
      return {
        loading: true
      }
    },
    mounted() {
      console.log("Smilekay回调页")
      let code = this.$utils.getUrlKey("code");
      let access_token = this.$utils.getUrlKey("#access_token");
      if (code != null) {
        this.$get('/login/sina', {code: code}).then(response => {
          this.$store.dispatch('asyncUpdateUser', response.data)
          this.$router.push("/mall");
        })
      } else if (access_token != null) {
        this.$get('/login/qq', {accessToken: access_token}).then(response => {
          this.$store.dispatch('asyncUpdateUser', response.data)
          this.$router.push("/mall");
        })
      } else {
        this.$router.push("/login");
      }
    }
  }
</script>

<style scoped>
  div {
    width: 100%;
    height: 100%;
    text-align: center;
  }
</style>
