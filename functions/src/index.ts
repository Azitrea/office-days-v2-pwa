/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const sendPushNotification = functions.https.onCall(
  async (data, _context) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { token, title, body } = data as any;

    if (!token || !title || !body) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing fields'
      );
    }

    const message = {
      token,
      notification: {
        title,
        body,
      },
    };

    try {
      const response = await admin.messaging().send(message);
      return { success: true, response };
    } catch (error) {
      console.error('Error sending push notification:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Failed to send push notification'
      );
    }
  }
);
