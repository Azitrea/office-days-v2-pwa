importScripts(
  "https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAbC5ldwxSVQhtOkQIaxSRpgJ0sszX_QUA",
  authDomain: "office-days-v2.firebaseapp.com",
  projectId: "office-days-v2",
  storageBucket: "office-days-v2.firebasestorage.app",
  messagingSenderId: "902123464873",
  appId: "1:902123464873:web:16473d49e9dd6db51c61b8",
  measurementId: "G-36JDQT4K84",
});
const messaging = firebase.messaging();
