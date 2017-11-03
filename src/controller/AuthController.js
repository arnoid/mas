import firebase from 'firebase';

export default class AuthController {

  constructor() {
    this.auth = firebase.auth();
  }

  login(userEmail, password) {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(userEmail, password)
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  }

  createUser({ userName, userEmail, password }) {
    return this.auth
      .createUserWithEmailAndPassword(userEmail, password)
      .then(() => this.login(userEmail, password))
      .then(user => new Promise((resolve, reject) => {
        user.updateProfile({ displayName: userName })
          .then(() => resolve(user))
          .catch(err => reject(err));
      }))
      .then(user => user.sendEmailVerification());
  }

}
