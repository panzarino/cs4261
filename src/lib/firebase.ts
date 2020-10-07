import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyD1KSkoY3MA4p4NYtefK3f8_-D7D0SKCOM',
    authDomain: 'smart-scheduler-gatech.firebaseapp.com',
    databaseURL: 'https://smart-scheduler-gatech.firebaseio.com',
    projectId: 'smart-scheduler-gatech',
    storageBucket: 'smart-scheduler-gatech.appspot.com',
    messagingSenderId: '627699150489',
    appId: '1:627699150489:web:a2403521a7cec7d0f65208'
};


firebase.initializeApp(config);

export default firebase;
