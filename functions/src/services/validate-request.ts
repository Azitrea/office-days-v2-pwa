import * as functions from 'firebase-functions';
import { AuthData } from 'firebase-functions/tasks';

const VALID_MESSAGE_TITLE_LENGTH = 40;
const VALID_MESSAGE_BODY_LENGTH = 150;

/**
 * Validate if the user is authenticated.
 * @param {AuthData | undefined} auth Auth object from firebase
 * @return {string} Returns the users uid.
 */
export const validateAuth = (auth: AuthData | undefined): string => {
  if (!auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be signed in'
    );
  }

  return auth.uid;
};

/**
 * Validates the user request object.
 * @param {number} data - { userIds, title, body }.
 * @returns {void}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateRequestData = (data: any): void => {
  const { userIds, title, body } = data;

  if ((!Array.isArray(userIds) && userIds !== '*') || !title || !body) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid input');
  }

  // Validate message title and body
  if (
    typeof title !== 'string' ||
    !title?.trim() ||
    title.length > VALID_MESSAGE_TITLE_LENGTH
  ) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid title');
  }
  if (
    typeof body !== 'string' ||
    !body?.trim() ||
    body.length > VALID_MESSAGE_BODY_LENGTH
  ) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid body');
  }
};
