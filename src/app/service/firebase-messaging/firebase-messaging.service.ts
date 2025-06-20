import { Injectable } from '@angular/core';
import {
  getMessaging,
  getToken,
  MessagePayload,
  onMessage,
  deleteToken,
  Unsubscribe,
  isSupported,
} from 'firebase/messaging';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FirebaseFirestoreService } from '../firebase-firestore/firebase-firestore.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseMessagingService {
  private _firebaseLocalStorageKey = 'firebase-messaging-active';

  private _isFirebaseMessagingInitialized = new BehaviorSubject<boolean>(false);
  private _isFirebaseMessagingActive = new BehaviorSubject<boolean>(false);
  private _isFirebaseMessagingSupported = new BehaviorSubject<boolean>(false);

  private _messageSubject: Subject<MessagePayload> = new Subject();
  private _messageUnsubscribeFunction: Unsubscribe | undefined;

  constructor(private firebaseFirestoreService: FirebaseFirestoreService) {
    this.initializeMessaging();
  }

  get isFirebaseMessagingInitialized(): boolean {
    return this._isFirebaseMessagingInitialized.value;
  }

  async initializeMessaging(): Promise<void> {
    const isMessagingSupported = await isSupported();
    this._isFirebaseMessagingSupported.next(isMessagingSupported);

    this._isFirebaseMessagingActive.next(this._getFirebaseMessagingStatus());
  }

  isFirebaseMessagignActive(): Observable<boolean> {
    return this._isFirebaseMessagingActive.asObservable();
  }

  isFirebaseMessagignActiveValue(): boolean {
    return this._isFirebaseMessagingActive.value;
  }

  isFirebaseMessagingSupported(): Observable<boolean> {
    return this._isFirebaseMessagingSupported.asObservable();
  }

  isFirebaseMessagingSupportedValue(): boolean {
    return this._isFirebaseMessagingSupported.value;
  }

  getMessagePayloadObservable(): Observable<MessagePayload> {
    return this._messageSubject.asObservable();
  }

  async requestPermission(userID: string): Promise<void> {
    if (!this._isFirebaseMessagingSupported.value) {
      return;
    }

    const messaging = getMessaging();

    const currentToken = await getToken(messaging, {
      vapidKey: environment.firebase.vapidKey,
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      this._setFirebaseMessagingStatus(false);
      return undefined;
    });

    if (currentToken) {
      await this.firebaseFirestoreService.saveTokenToFirestore(
        userID,
        currentToken
      );
      this._setFirebaseMessagingStatus(true);
      this._isFirebaseMessagingInitialized.next(true);
    } else {
      console.log(
        'No registration token available. Request permission to generate one.'
      );
      this._setFirebaseMessagingStatus(false);
      this._isFirebaseMessagingInitialized.next(false);
    }
  }

  listen() {
    if (!this._isFirebaseMessagingSupported.value) {
      return;
    }

    const messaging = getMessaging();
    this._messageUnsubscribeFunction = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this._messageSubject.next(payload);
    });
  }

  async deleteUserMessageSubscription(userID: string): Promise<void> {
    if (
      !this._isFirebaseMessagingActive.value ||
      !this._isFirebaseMessagingSupported.value
    ) {
      return;
    }

    const messaging = getMessaging();

    const token = await getToken(messaging, {
      vapidKey: environment.firebase.vapidKey,
    });

    try {
      await this.firebaseFirestoreService.deleteTokenFromFirestore(
        userID,
        token
      );
      await deleteToken(messaging);
      if (this._messageUnsubscribeFunction) {
        this._messageUnsubscribeFunction();
      }

      this._isFirebaseMessagingInitialized.next(false);
      this._setFirebaseMessagingStatus(false);
    } catch (error) {
      console.error('Failed to cancel message subscriptions');
    }
  }

  clearFirebaseMessagingStatus(): void {
    localStorage.removeItem(this._firebaseLocalStorageKey); // Remove istead of set to false
    this._isFirebaseMessagingActive.next(true);
    this._isFirebaseMessagingInitialized.next(false);
  }

  private _setFirebaseMessagingStatus(status: boolean): void {
    localStorage.setItem(this._firebaseLocalStorageKey, `${status}`);
    this._isFirebaseMessagingActive.next(status);
  }

  private _getFirebaseMessagingStatus(): boolean {
    const messagignStatus = localStorage.getItem(this._firebaseLocalStorageKey);
    console.log('messagignStatus', messagignStatus);
    return (
      messagignStatus === 'true' ||
      messagignStatus === null ||
      messagignStatus === undefined
    );
  }
}
