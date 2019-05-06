<template>
  <div v-model="name">
    Hello {{name}}
  </div>
</template>

<script>
  export default {
    name: "Callback",
    data() {
      return {
        name: 'huhu'
      }
    },
    mounted() {
      const
        params = {
          oauth_consumer_key: "101571153",
          access_token: "5224CE0E92A7DA7C0C00186C139A7E67",
          openid: "E171D7D165C0A04B263EE2584B9C6BB7"
        };
      QC.api("get_user_info", params).complete(function (resp) {
        console.log("Name = " + resp.data.nickname)
        this.name = resp.data.nickname;
      });
    }
  }
</script>

<style scoped>

</style>
