import { UserProfileData } from '../models/user.model.js';

/**
 * Save the incoming messages to firestore
 * @param {FirebaseFirestore.Firestore} db Firestore reference
 * @param {string} userIds List of userIDs whom to send notification or '*' for everyone
 */
export const getUserTokens = async (
  db: FirebaseFirestore.Firestore,
  userIds: string[] | '*'
): Promise<string[]> => {
  const tokensToSend: string[] = [];

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

  return tokensToSend;
};
