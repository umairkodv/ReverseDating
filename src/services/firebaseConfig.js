import {initializeApp, getApps} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAV3tErVywsPj-Mg-NnyNPhe5H8uTzW7QI',
  authDomain: 'dating-reverse.firebaseapp.com',
  databaseURL:
    'https://dating-reverse-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'dating-reverse',
  storageBucket: 'dating-reverse.firebasestorage.app',
  messagingSenderId: '956518576811',
  appId: '1:956518576811:android:d6e12e697e6309424b3dee',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const db = getDatabase(app);

export {app, db};
