$(document).ready(function () {
  // INITIALIZE FIREBASE
  firebase.initializeApp({
    apiKey: "AIzaSyDUH6vOCALEXSjYHgv8P9d2y3tKklE44qA",
    authDomain: "f2e2020-bd468.firebaseapp.com",
    databaseURL: "https://f2e2020-bd468.firebaseio.com",
    projectId: "f2e2020-bd468",
    storageBucket: "f2e2020-bd468.appspot.com",
    messagingSenderId: "832044128799",
    appId: "1:832044128799:web:5dedad46efcd2c3253932a",
  });

  // REFERENCE PUSHSERVER
  let docRef = firebase.firestore().collection("pushserver").doc("pushinfo");
  // REFERENCE PUSH MESSAGES
  let messagesRef = docRef.collection("messages");
  // REFERENCE CLIENT ID
  let clientsRef = docRef.collection("clients");

  // REGISTER DOM ELEMENTS
  const $messageField = $("#message-field");
  // EXPO PUSH SERVER
  const EXPO_PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";

  // LISTEN FOR KEYPRESS EVENT
  $messageField.keypress(async function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      let message = $messageField.val();

      //SAVE MESSAGE
      messagesRef.add({
        message: message,
        timeStamp: Date.now(),
      });

      // EMPTY INPUT FIELD
      $messageField.val("");

      // // SEND A PUSH NOTIFICATION
      // let pushMessages = [];
      // const snapshot = await clientsRef.get()
      // snapshot.docs.map(doc => {
      //   const pushMessage = {
      //     to: doc.data().token,
      //     sound: "default",
      //     title: "Original Title",
      //     body: "And here is the body!",
      //     data: { text: message },
      //     _displayInForeground: true,
      //   };
      //   pushMessages.push(pushMessage);
      // });

      // try {
      //   await axios.post(EXPO_PUSH_ENDPOINT, pushMessages);
      // } catch (e) {
      //   console.log(e);
      // }
    }
  });
});
