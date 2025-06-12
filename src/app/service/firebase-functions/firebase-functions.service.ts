import { inject, Injectable } from '@angular/core';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFunctionsService {
  private firebseService = inject(FirebaseService);

  _firebaseFunctions = getFunctions(this.firebseService.getFirebaseApp());

  constructor() {}

  async sendNotificationToUsers(
    userIds: string[],
    title: string,
    body: string
  ) {
    if (userIds.length === 0) {
      throw new Error('UserIDs are missing');
    }
    const sendPush = httpsCallable(
      this._firebaseFunctions,
      'sendPushToUserIds'
    );

    console.log('_firebaseFunctions', sendPush);
    try {
      const result = await sendPush({ userIds, title, body });
      console.log('Push sent:', result.data);
    } catch (error) {
      console.error('Error sending push:', error);
    }
  }
}
