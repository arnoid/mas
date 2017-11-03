<template>
  <div>
    <h1>Authorise</h1>

    <p v-if="authorisation.isAuthorisationError">{{ authorisation.errorMessage }}</p>
    <div v-if="authorisation.isAuthorisationInProgress">
      <label>Authorisation in progress...</label>
    </div>
    <div v-else-if="isAuthorised()">
      <button v-on:click="logout()">Logout</button>
    </div>
    <div v-else>
      <input type="radio" id="Sign-in" value="sign_in" v-model="signMode">
      <label for="Sign-in">Sign-in</label>
      <br>
      <input type="radio" id="Sign-up" value="sign_up" v-model="signMode">
      <label for="Sign-up">Sign-up</label>
      <br>

      <div v-if="isSignUpMode()">
        <label for="txt-name">Name</label>
        <input type="text" id="txt-name" v-model="userForm.name">
      </div>
      <div>
        <label for="txt-email">Email</label>
        <input type="text" id="txt-email" v-model="userForm.email">
      </div>
      <div>
        <label for="txt-password">Password</label>
        <input type="password" id="txt-password" v-model="userForm.password">
      </div>

      <button v-if="isSignUpMode()" v-on:click="createUser()">Sign-up</button>
      <button v-else v-on:click="login()">Sign-in</button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'Authorise',
    data() {
      return {
        ...mapState,
        signMode: 'sign_in',
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
    methods: {
      ...mapMutations({
        mutateUser: 'mutateUser',
      }),
      ...mapGetters([
        'isAuthorised',
        'getAuth',
      ]),
      logout() {
        this.getAuth().logout()
          .then(() => {
            this.mutateUser(null);
          });
      },
      isSignUpMode() {
        return this.signMode === 'sign_up';
      },
      login() {
        this.clearAuthErrorState();
        this.isAuthorisationInProgress = true;
        this.getAuth().login(
          this.userForm.email,
          this.userForm.password,
        )
          .then((user) => {
            this.mutateUser(user);
          })
          .then(() => {
            this.$router.push('/');
          })
          .catch((error) => {
            this.setAuthErrorState(error.message);
            console.error(error);
          })
          .then(() => {
            this.isAuthorisationInProgress = false;
          });
      },
      createUser() {
        this.clearAuthErrorState();
        this.authorisation.isAuthorisationInProgress = true;
        this.getAuth().createUser({
          userName: this.userForm.name,
          userEmail: this.userForm.email,
          password: this.userForm.password,
        })
          .then(() => {
            this.mutateUser(null);
          })
          .then(() => {
            this.$router.push('/');
          })
          .catch((error) => {
            this.setAuthErrorState(error.message);
            console.error(error);
          })
          .then(() => {
            this.authorisation.isAuthorisationInProgress = false;
          });
      },
      clearAuthErrorState() {
        this.authorisation.errorMessage = null;
        this.authorisation.isAuthorisationError = false;
      },
      setAuthErrorState(message) {
        this.authorisation.errorMessage = message;
        this.authorisation.isAuthorisationError = true;
      },
    },

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
