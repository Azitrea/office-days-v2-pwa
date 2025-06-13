import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getMessaging, MulticastMessage } from 'firebase-admin/messaging';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

initializeApp();
const db = getFirestore();
const messaging = getMessaging();

export const sendPushToUserIds = functions.https.onCall(
  { region: 'europe-west3' },
  async (request) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { userIds, title, body } = request.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!request.auth) {
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
        const userRef = await db.doc(`users/${userId}`);
        const docSnapshot = await userRef.get();
        if (!docSnapshot.exists) {
          continue;
        }

        const userDetail = docSnapshot.data() as UserProfileData;
        if (!userDetail?.details.receiveMessages) {
          continue;
        }

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

export interface UserProfileData {
  id?: string;
  createdAt: Timestamp;
  details: UserDetails;
}

export interface UserDetails {
  receiveMessages: boolean;
}
