import firebase from 'firebase';
import firebaseConfig from '../firebase-config';

export default class AuthController {

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.firebase = firebase;
  }

  login(userEmail, password) {
    return this.firebase.auth().signInWithEmailAndPassword(userEmail, password)
      .then(user => new Promise((resolve, reject) => {
        if (!user) {
          reject({
            code: 'auth/not-verified',
            message: 'User is not Verified',
          });
        } else if (user.emailVerified) {
          resolve(user);
        } else {
          reject({
            code: 'auth/not-verified',
            message: 'User is not Verified',
          });
        }
      }))
      .then(user => user.getIdToken())
      .then((token) => {
        const currentUser = this.firebase.auth().currentUser;
        currentUser.securityToken = token;

        return AuthController.mapUser(currentUser);
      });
  }

  logout() {
    return this.firebase.auth().signOut();
  }

  isAuthorised() {
    return Boolean(this.firebase.auth().currentUser);
  }

  createUser({ userName, userEmail, password }) {
    return this.firebase.auth()
      .createUserWithEmailAndPassword(userEmail, password)
      .then(() => this.login(userEmail, password))
      .then(user => user.updateProfile({ displayName: userName }))
      .then(user => user.sendEmailVerification());
  }

  static mapUser(user) {
    let result;

    if (user) {
      result = {
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        token: user.securityToken,
      };
    } else {
      result = null;
    }

    console.log(result);

    return result;
  }

  // reauthenticate({ userEmail, password }) {
  //   const user = firebase.auth().currentUser;
  //   const credential = firebase.auth.EmailAuthProvider.credential(userEmail, password);
  //
  //   return user.reauthenticateWithCredential(credential);
  // }

}
