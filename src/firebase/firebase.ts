// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAY_4qtQb7TgGyC_xSW1wSCtpCBqbfZ-2Y',
  authDomain: 'schedule-a3019.firebaseapp.com',
  projectId: 'schedule-a3019',
  storageBucket: 'schedule-a3019.firebasestorage.app',
  messagingSenderId: '518051456925',
  appId: '1:518051456925:web:7fe6159d1e5fcabd863174',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
