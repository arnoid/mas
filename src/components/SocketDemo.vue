<template>
  <div class="hello">
    <h1>Socket demo</h1>
    <button v-on:click="call()">call</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'SocketDemo',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
    methods: {
      ...mapActions([
        'signInWithEmailAndPassword',
      ]),
      call() {
        this.signInWithEmailAndPassword({
          useremail: 'user@gmail.com',
          password: 'password',
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
