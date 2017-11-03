<template>
  <div>
    <h1>Socket demo</h1>
    <button v-on:click="call()">call</button>
  </div>
</template>

<script>
  export default {
    name: 'SocketDemo',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
    methods: {
      call() {
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
