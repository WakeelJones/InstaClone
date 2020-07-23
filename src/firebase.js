import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDyUvrAr6wWXCgHS-dmKtAtW0uGMLWSjvQ',
  authDomain: 'angrycreative-instagram-clone.firebaseapp.com',
  databaseURL: 'https://angrycreative-instagram-clone.firebaseio.com',
  projectId: 'angrycreative-instagram-clone',
  storageBucket: 'angrycreative-instagram-clone.appspot.com',
  messagingSenderId: '728001001167',
  appId: '1:728001001167:web:91676fd8bf8b3544caa9ba',
  measurementId: 'G-2TC40YJSSW',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage }
