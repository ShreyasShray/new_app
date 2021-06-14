import firebase from 'firebase';
require("@firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyDqOHH9WxWldw9bn61EnCeL6ju44O73gS4",
    authDomain: "new-app-e792b.firebaseapp.com",
    projectId: "new-app-e792b",
    storageBucket: "new-app-e792b.appspot.com",
    messagingSenderId: "1025625865441",
    appId: "1:1025625865441:web:814ab4def16a384e7a0ba0"
  };
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();