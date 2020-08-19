import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDwDiA-IiTZFs8CvK736WGIylmAvNYelBU",
    authDomain: "myshoppinglist-90365.firebaseapp.com",
    databaseURL: "https://myshoppinglist-90365.firebaseio.com",
    projectId: "myshoppinglist-90365",
    storageBucket: "myshoppinglist-90365.appspot.com",
    messagingSenderId: "758300236290",
    appId: "1:758300236290:web:82ebb4cd0a282911e9251b"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export default storage;