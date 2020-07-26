import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCl8FxrxbIgHgTnPz_JUJKZvifE6eaokN4",
  authDomain: "khanh-db.firebaseapp.com",
  databaseURL: "https://khanh-db.firebaseio.com",
  projectId: "khanh-db",
  storageBucket: "khanh-db.appspot.com",
  messagingSenderId: "632256995848",
  appId: "1:632256995848:web:117eb2e88e38d638f627bd",
  measurementId: "G-BZC0B5GYWV",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
