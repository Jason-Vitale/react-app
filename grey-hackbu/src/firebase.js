import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyATcQBcBVJAYZbn9EfKNq6DjXtFdx25tss",
    authDomain: "grey-hackbu.firebaseapp.com",
    projectId: "grey-hackbu",
    storageBucket: "grey-hackbu.appspot.com",
    messagingSenderId: "748662363480",
    appId: "1:748662363480:web:4faf4f4fcd12e0f20d012d",
    measurementId: "G-7GDWG2D6FF"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);


//export {db, auth, storage};
export { db, auth, storage };