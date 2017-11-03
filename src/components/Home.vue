<template>
  <div>
    <h1>Home</h1>
    <router-link :to="'authorise'">Authorise</router-link>
    <router-link :to="'socket'">Socket</router-link>
    <router-link :to="'profile'">User profile</router-link>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
