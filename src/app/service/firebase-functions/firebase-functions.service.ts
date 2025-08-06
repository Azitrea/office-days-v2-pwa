import { inject, Injectable } from '@angular/core';
import {
  getFunctions,
  httpsCallable,
  HttpsCallableResult,
} from 'firebase/functions';
import { FirebaseService } from '../firebase/firebase.service';
import { AcceptDecline } from '../../model/messages.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFunctionsService {
  private firebseService = inject(FirebaseService);

  _firebaseFunctions = getFunctions(
    this.firebseService.getFirebaseApp(),
    'europe-west3'
  );

  constructor() {}

  async sendNotificationToUsers(
    userIds: string[] | '*',
    title: string,
    body: string
  ): Promise<HttpsCallableResult<Record<string, string | number | undefined>>> {
    if (userIds.length === 0) {
      throw new Error('No users in the syste.');
    }
    const sendPush = httpsCallable(
      this._firebaseFunctions,
      'sendPushToUserIds'
    );
    return (await sendPush({ userIds, title, body })) as HttpsCallableResult<
      Record<string, string | number | undefined>
    >;
  }

  async acceptDeclineInvitation(
    messageID: string,
    acceptDeclineResult: AcceptDecline
  ): Promise<HttpsCallableResult<Record<string, string>>> {
    const acceptDeclineInvitationFn = httpsCallable(
      this._firebaseFunctions,
      'acceptDeclineInvitation'
    );

    return (await acceptDeclineInvitationFn({
      messageID,
      acceptDeclineResult,
    })) as HttpsCallableResult<Record<string, string>>;
  }
}
