import firebase from "firebase";

const firebaseConfig = {
  // PLACE YOUR CREDENTIALS HERE
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

  const cacheSizeInMB = 150;
  firebase.firestore().settings({
    cacheSizeBytes: cacheSizeInMB * 1000 * 1000,
  });
  firebase.firestore().enablePersistence({
    synchronizeTabs: true,
  });
} else {
  firebase.app();
}

const db = firebase.firestore();

export default db;
