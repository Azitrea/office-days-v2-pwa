import {
  BatchResponse,
  Messaging,
  MulticastMessage,
} from 'firebase-admin/messaging';

/**
 * Save the incoming messages to firestore
 * @param {Messaging} messaging Messaging reference
 * @param {string[]} tokensToSend - FCM tokens
 * @param {string} senderUID The userID of the sender - request.auth.uid
 * @param {string} title - message title
 * @param {string} body - message body
 */
export const sendNotification = async (
  messaging: Messaging,
  tokensToSend: string[],
  senderUID: string,
  title: string,
  body: string
): Promise<BatchResponse> => {
  const message: MulticastMessage = {
    tokens: tokensToSend,
    notification: { title, body },
    data: {
      senderUID: senderUID,
    },
    webpush: {
      notification: {
        title,
        body,
        icon: 'https://office-days-v2.web.app/assets/icons/drawable-xxhdpi/cigar.png',
        badge: 'https://office-days-v2.web.app/assets/icons/drawable-xxhdpi/cigar.png',
        image: 'https://office-days-v2.web.app/assets/images/banner.png',
        renotify: true,
        tag: 'office-days',
      },
      fcmOptions: {
        link: 'https://office-days-v2.web.app/',
      },
    },
  };
  return messaging.sendEachForMulticast(message);
};
