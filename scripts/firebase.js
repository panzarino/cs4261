const firebase = require('firebase-admin')

const config = require('../service-account.json')

firebase.initializeApp({
  credential: firebase.credential.cert(config),
  databaseURL: 'https://smart-scheduler-gatech.firebaseio.com',
})

module.exports = firebase
