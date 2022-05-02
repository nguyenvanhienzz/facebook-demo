import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyC_kETDNTEhY2tsl83L9BCfyosHfKw0JxU",
    authDomain: "video-facebook-a5940.firebaseapp.com",
    projectId: "video-facebook-a5940",
    storageBucket: "video-facebook-a5940.appspot.com",
    messagingSenderId: "348743652262",
    appId: "1:348743652262:web:552f9614f93fec83e1f567",
    measurementId: "G-J0VXL4NB6Y"
};
firebase(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };