import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDE01SRVB6g99NCtlYfhgpW-3Ctc4PZdpg",
  authDomain: "reactnativedatabase-e3164.firebaseapp.com",
  databaseURL: "https://reactnativedatabase-e3164.firebaseio.com",
  projectId: "reactnativedatabase-e3164",
  storageBucket: "reactnativedatabase-e3164.appspot.com",
  messagingSenderId: "5654389138",
  appId: "1:5654389138:web:91ada309162d79ce"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
