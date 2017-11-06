<template>
  <div>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'app',
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #navbar {
    height: 60px;
    min-height: 100%;
    position: relative;
    background-color: #4a148c;
    padding: 5px;
    display: block;
  }

  #navbar-logo {
    float: left;
    width: 50px;
    height: 100%;
  }

  #navbar-title {
    color: white;
    text-align: center;
  }
</style>
