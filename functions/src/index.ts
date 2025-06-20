import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getMessaging, MulticastMessage } from 'firebase-admin/messaging';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

initializeApp();
const db = getFirestore();
const messaging = getMessaging();

const DELAY_BETWEEN_MESSAGES = 3;

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

    if ((!Array.isArray(userIds) && userIds !== '*') || !title || !body) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid input');
    }

    const recentMsgSnap = await db
      .collection('messageLogs')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    const recentMessage = recentMsgSnap.docs[0]?.data();
    const now = Timestamp.now();
    const fiveMinutesAgo = Timestamp.fromMillis(
      now.toMillis() - DELAY_BETWEEN_MESSAGES * 60 * 1000
    );

    if (
      recentMessage &&
      !recentMsgSnap.empty &&
      recentMessage.createdAt.toMillis() > fiveMinutesAgo.toMillis()
    ) {
      const nextTime = Timestamp.fromMillis(
        recentMessage.createdAt.toMillis() + DELAY_BETWEEN_MESSAGES * 60 * 1000
      );
      throw new functions.https.HttpsError(
        'resource-exhausted',
        `Notifications can only be sent every ${DELAY_BETWEEN_MESSAGES} minutes`,
        {
          nextMessageCanBeSent: nextTime,
        }
      );
    }

    const tokensToSend: string[] = [];

    try {
      const messageLogs: {
        userId: string;
        title: string;
        body: string;
        createdAt: Date;
      } = {
        userId: request.auth.uid,
        title,
        body,
        createdAt: new Date(),
      };

      const ref = db.collection('messageLogs').doc();
      ref.set(messageLogs);

      const localUserIDs =
        userIds === '*'
          ? (await db.collection('users').get()).docs.map((doc) => doc.id)
          : userIds;

      for (const userId of localUserIDs) {
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
        tokens: tokensToSend,
        notification: { title, body },
        data: {
          senderUID: request.auth.uid,
        },
        webpush: {
          notification: {
            title,
            body,
            /* actions: [{ title: 'Ok', action: 'Ok' }], */
            data: {
              senderUID: request.auth.uid,
            },
            /* icon: '',
            image: '',
            badge: '', */
            renotify: true,
          },
          fcmOptions: {
            link: 'https://office-days-v2.web.app/',
          },
        },
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
