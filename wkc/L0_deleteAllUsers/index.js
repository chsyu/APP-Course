const admin = require("firebase-admin");
const serviceAccount = require("./f2e2021-44d38-firebase-adminsdk-gs5op-e71abe9341.json");
const databaseURL = "https://F2E2021.firebaseio.com"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

const deleteAllUsers = (nextPageToken) => {
  let uids = []
  admin
    .auth()
    .listUsers(100, nextPageToken)
    .then((listUsersResult) => {
      uids = uids.concat(listUsersResult.users.map((userRecord) => userRecord.uid))
      console.log(uids)
      if (listUsersResult.pageToken) {
        deleteAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    }).finally(() => {
      admin.auth().deleteUsers(uids)
    })
};

deleteAllUsers();