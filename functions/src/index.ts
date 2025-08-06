import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import {
  validateAuth,
  validateRequestData,
} from './services/validate-request.js';
import { rateLimitCheck } from './services/request-rate-limit.js';
import { saveMessageLog } from './services/message-log-handler.js';
import { getUserTokens } from './services/user-token-handler.js';
import { sendNotification } from './services/notification-handler.js';
import { getMessaging } from 'firebase-admin/messaging';
import { AcceptDecline } from './models/message.model.js';

initializeApp();
const db = getFirestore();
const messaging = getMessaging();

export const sendPushToUserIds = functions.https.onCall(
  { region: 'europe-west3' },
  async (request) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { userIds, title, body } = request.data;
    const auth = request.auth;
    const uid = validateAuth(auth);

    validateRequestData(request.data);
    await rateLimitCheck(db);

    try {
      await saveMessageLog(db, uid, title, body);

      const tokensToSend: string[] = await getUserTokens(db, userIds);
      if (tokensToSend.length === 0) {
        return { successCount: 0, failureCount: 0, message: 'No tokens found' };
      }

      const response = await sendNotification(
        messaging,
        tokensToSend,
        uid,
        title,
        body
      );

      return {
        successCount: response.successCount,
        failureCount: response.failureCount,
      };
    } catch (error) {
      console.error('Error sending notifications:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error sending notifications'
      );
    }
  }
);

export const acceptDeclineInvitation = functions.https.onCall(
  { region: 'europe-west3' },
  async (request) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { messageID, acceptDeclineResult } = request.data;
    const auth = request.auth;
    const _uid = validateAuth(auth);

    if (
      !messageID ||
      (acceptDeclineResult !== AcceptDecline.ACCEPT &&
        acceptDeclineResult !== AcceptDecline.DECLINE)
    ) {
      console.error('Missing parameters', request?.data);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing or invalid parameters'
      );
    }

    const messageRef = db.collection('messageLogs').doc(messageID);

    try {
      await messageRef.set(
        {
          acceptDecline: {
            [_uid]: acceptDeclineResult,
          },
        },
        { merge: true }
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error updating document:', error);
      throw new functions.https.HttpsError(
        'unknown',
        'Failed to update message document'
      );
    }
  }
);
