import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getMessaging, MulticastMessage } from 'firebase-admin/messaging';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();
const db = getFirestore();
const messaging = getMessaging();

export const sendPushToUserIds = functions.https.onCall(
  { region: 'europe-west3' },
  async (data, context) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { userIds, title, body } = data as any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(context as any)?.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be signed in'
      );
    }

    if (!Array.isArray(userIds) || !title || !body) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid input');
    }

    const tokensToSend: string[] = [];

    try {
      for (const userId of userIds) {
        const tokensSnapshot = await db
          .collection(`users/${userId}/fcmTokens`)
          .get();

        tokensSnapshot.forEach((doc) => {
          const tokenData = doc.data();
          if (tokenData?.token) {
            tokensToSend.push(tokenData.token);
          }
        });
      }

      if (tokensToSend.length === 0) {
        return { successCount: 0, failureCount: 0, message: 'No tokens found' };
      }

      const message: MulticastMessage = {
        notification: { title, body },
        tokens: tokensToSend,
      };

      const response = await messaging.sendEachForMulticast(message);

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
