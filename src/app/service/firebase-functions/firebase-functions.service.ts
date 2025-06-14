import { inject, Injectable } from '@angular/core';
import {
  getFunctions,
  httpsCallable,
  HttpsCallableResult,
} from 'firebase/functions';
import { FirebaseService } from '../firebase/firebase.service';

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
    userIds: string[],
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
}
