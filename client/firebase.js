import firebase from '@firebase/app';
import '@firebase/database';

const config = {
  apiKey: 'AIzaSyB07D3cS0YmME6c1hJjHc-V2pJn8VzLw_s',
  authDomain: 'react-firebase-64fce.firebaseapp.com',
  databaseURL: 'https://react-firebase-64fce.firebaseio.com',
  projectId: 'react-firebase-64fce',
  storageBucket: 'react-firebase-64fce.appspot.com',
  messagingSenderId: '683249994387',
};
firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();
