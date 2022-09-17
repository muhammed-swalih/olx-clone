import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyAJdGwdEa4JXg4JhdmUycVN_7p_0MqrRH4",
    authDomain: "olx-clone-e0bac.firebaseapp.com",
    projectId: "olx-clone-e0bac",
    storageBucket: "olx-clone-e0bac.appspot.com",
    messagingSenderId: "699101315044",
    appId: "1:699101315044:web:18d694d5a54a97560391f1",
    measurementId: "G-6EKDTJPK34"
  };

 export const firebase = initializeApp(firebaseConfig);
 export const auth = getAuth();
 export const db = getFirestore(firebase);
 export const storage = getStorage(firebase);
  
 
