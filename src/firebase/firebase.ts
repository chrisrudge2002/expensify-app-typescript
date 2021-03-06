import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyDQVN0aOjEY56ZrGWTux215ANvkmSIlhDg",
    authDomain: "expensify-app-71442.firebaseapp.com",
    databaseURL: "https://expensify-app-71442.firebaseio.com",
    messagingSenderId: "818919110065",
    projectId: "expensify-app-71442",
    storageBucket: "expensify-app-71442.appspot.com",
};

firebase.initializeApp(config);

const database: firebase.database.Database = firebase.database();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const googleAuthProivder = new firebase.auth.GoogleAuthProvider();

export { firebase, githubAuthProvider, googleAuthProivder, database as default };
