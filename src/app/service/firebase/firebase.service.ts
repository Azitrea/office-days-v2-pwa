import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { environment } from '../../../environments/environment';
import {
  getMessaging,
  getToken,
  MessagePayload,
  onMessage,
} from 'firebase/messaging';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _messageSubject: Subject<MessagePayload> = new Subject();

  constructor() {}

  initializeFirebase(): void {
    // Initialize Firebase
    const app = initializeApp(environment.firebase);
    const analytics = getAnalytics(app);
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
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this._messageSubject.next(payload);
    });
  }
}
