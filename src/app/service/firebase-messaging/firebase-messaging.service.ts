import { Injectable } from '@angular/core';
import {
  getMessaging,
  getToken,
  MessagePayload,
  onMessage,
  deleteToken,
  Unsubscribe,
} from 'firebase/messaging';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FirebaseFirestoreService } from '../firebase-firestore/firebase-firestore.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseMessagingService {
  private _firebaseLocalStorageKey = 'firebase-messaging-active';

  private _isFirebaseMessagingActive = new BehaviorSubject<boolean>(false);

  private _messageSubject: Subject<MessagePayload> = new Subject();
  private _messageUnsubscribeFunction: Unsubscribe | undefined;

  constructor(private firebaseFirestoreService: FirebaseFirestoreService) {}

  initializeMessaging(): void {
    this._isFirebaseMessagingActive.next(this._getFirebaseMessagingStatus());
  }

  isFirebaseMessagignActive(): Observable<boolean> {
    return this._isFirebaseMessagingActive.asObservable();
  }

  getMessagePayloadObservable(): Observable<MessagePayload> {
    return this._messageSubject.asObservable();
  }

  requestPermission() {
    const messaging = getMessaging();

    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Token');
          console.log(currentToken);

          this.firebaseFirestoreService.saveTokenToFirestore(currentToken);
          this._setFirebaseMessagingStatus(true);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
          this._setFirebaseMessagingStatus(false);
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        this._setFirebaseMessagingStatus(false);
      });
  }

  listen() {
    const messaging = getMessaging();
    this._messageUnsubscribeFunction = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this._messageSubject.next(payload);
    });
  }

  async deleteUserMessageSubscription() {
    if (!this._isFirebaseMessagingActive.value) {
      return;
    }

    const messaging = getMessaging();

    const token = await getToken(messaging, {
      vapidKey: environment.firebase.vapidKey,
    });

    await this.firebaseFirestoreService.deleteTokenFromFirestore(token);
    await deleteToken(messaging);
    if (this._messageUnsubscribeFunction) {
      this._messageUnsubscribeFunction();
    }

    this._setFirebaseMessagingStatus(false);
  }

  private _setFirebaseMessagingStatus(status: boolean): void {
    localStorage.setItem(this._firebaseLocalStorageKey, `${status}`);
    this._isFirebaseMessagingActive.next(status);
  }

  private _getFirebaseMessagingStatus(): boolean {
    return localStorage.getItem(this._firebaseLocalStorageKey) === 'true';
  }
}
