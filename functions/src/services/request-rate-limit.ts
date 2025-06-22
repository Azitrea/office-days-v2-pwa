import * as functions from 'firebase-functions';
import { Timestamp } from 'firebase-admin/firestore';

const DELAY_BETWEEN_MESSAGES = 3;

/**
 * Rate limits the requests
 * @param {FirebaseFirestore.Firestore} db
 * @return {void}
 */
export const rateLimitCheck = async (
  db: FirebaseFirestore.Firestore
): Promise<void> => {
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
};
