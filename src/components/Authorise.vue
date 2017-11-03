<template>
  <div class="hello">
    <h1>Authorise</h1>

    <div v-if="isAuthorisationInProgress">
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
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
  import AuthController from '../controller/AuthController';


  export default {
    name: 'Authorise',
    data() {
      return {
        ...mapState,
        signMode: 'sign_in',
        controller: {
          auth: new AuthController(),
        },
        userForm: {
          email: null,
          password: null,
          name: null,
        },
        isAuthorisationInProgress: false,
      };
    },
    watched: {
    },
    methods: {
      ...mapActions([
      ]),
      ...mapMutations([
        'removeUser',
        'setUser',
      ]),
      ...mapGetters([
        'isAuthorised',
      ]),
      logout() {
        this.removeUser();
      },
      isSignUpMode() {
        return this.signMode === 'sign_up';
      },
      login() {
        this.isAuthorisationInProgress = true;
        this.controller.auth.login(
          this.userForm.email,
          this.userForm.password,
        )
          .then(user => new Promise((resolve, reject) => {
            // {
            // uid: '3t6rdpQElhRIoDqgVmYY1BDCh5X2',
            //   displayName: 'arnoid',
            //   photoURL: null,
            //   email: 'stratoangel@gmail.com',
            //   emailVerified: false,
            //   phoneNumber: null,
            //   isAnonymous: false,
            //   metadata: {
            //       lastSignInTime: 'Thu, 02 Nov 2017 11:08:04 GMT',
            //       creationTime: 'Thu, 02 Nov 2017 11:08:04 GMT'
            //     }
            // }
            if (user.emailVerified) {
              resolve(user);
            } else {
              reject('User is not Verified');
            }
          }))
          .then((user) => {
            this.$store.commit('setUser', user);
          })
          .catch((error) => {
            console.error(error);
          })
          .then(() => {
            this.isAuthorisationInProgress = false;
          });
      },
      createUser() {
        this.isAuthorisationInProgress = true;
        this.controller.auth.createUser({
          userName: this.userForm.name,
          userEmail: this.userForm.email,
          password: this.userForm.password,
        })
          .then((user) => {
            this.$store.commit('setUser', user);
          })
          .catch((error) => {
            console.error(error);
          })
          .then(() => {
            this.isAuthorisationInProgress = false;
          });
      },
    },

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
