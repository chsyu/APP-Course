var Expo = require('exponent-server-sdk');

module.exports = function (req, res, next) {
  // To check if something is a push token

  let pushToken = req.body.token;
  let message = req.body.message;
  let isPushToken = Expo.isExponentPushToken(pushToken);

  // Create a new Expo SDK client
  let expo = new Expo();

  // To send push notifications -- note that there is a limit on the number of
  // notifications you can send at once, use expo.chunkPushNotifications()
  expo.sendPushNotificationsAsync([{
    // The push token for the app user to whom you want to send the notification
    to: pushToken,
    sound: 'default',
    body: message,
    data: { text: message },
  }]).then((receipts => {
      console.log('Finished...')
      console.log(receipts)
    }));
}