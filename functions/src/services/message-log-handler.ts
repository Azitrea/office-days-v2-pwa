/**
 * Save the incoming messages to firestore
 * @param {FirebaseFirestore.Firestore} db Firestore reference
 * @param {string} requesterUserID The userID of the sender - request.auth.uid
 * @param {string} title - message title
 * @param {string} body - message body
 */
export const saveMessageLog = async (
  db: FirebaseFirestore.Firestore,
  requesterUserID: string,
  title: string,
  body: string
): Promise<void> => {
  const messageLogs: {
    userId: string;
    title: string;
    body: string;
    createdAt: Date;
  } = {
    userId: requesterUserID,
    title,
    body,
    createdAt: new Date(),
  };

  const ref = db.collection('messageLogs').doc();
  ref.set(messageLogs);
};
