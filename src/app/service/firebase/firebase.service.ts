import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { environment } from '../../../environments/environment';
import {
  getMessaging,
  getToken,
  MessagePayload,
  onMessage,
  deleteToken,
  Unsubscribe,
} from 'firebase/messaging';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _firebaseLocalStorageKey = 'firebase-messaging-active';

  private _isFirebaseMessagingActive = new BehaviorSubject<boolean>(false);

  private _messageSubject: Subject<MessagePayload> = new Subject();
  private _messageUnsubscribeFunction: Unsubscribe | undefined;

  constructor() {}

  initializeFirebase(): void {
    // Initialize Firebase
    const app = initializeApp(environment.firebase);
    const analytics = getAnalytics(app);

    this._isFirebaseMessagingActive.next(
      localStorage.getItem(this._firebaseLocalStorageKey) === 'true'
    );
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
    const messaging = getMessaging();

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
}
