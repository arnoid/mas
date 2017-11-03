<template>
  <div>
    <h1>User profile</h1>
    <div v-if="isAuthorised">
      <label for="Sign-in">Sign-in</label>
      <input type="radio" id="Sign-in" value="sign_in" v-model="signMode">

    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';

  export default {
    name: 'Authorise',
    data() {
      return {
        ...mapState,
        userForm: {
          email: null,
          password: null,
          name: null,
        },
        authorisation: {
          isAuthorisationInProgress: false,
          isAuthorisationError: false,
          errorMessage: null,
        },
      };
    },
    watched: {
    },
    methods: {
      ...mapActions([
      ]),
      ...mapGetters([
        'isAuthorised',
      ]),
    },

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
