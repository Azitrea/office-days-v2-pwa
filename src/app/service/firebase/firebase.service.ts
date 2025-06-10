import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _app: FirebaseApp | undefined;

  constructor() {}

  initializeFirebase(): void {
    // Initialize Firebase
    if (this._app) {
      return;
    }

    this._app = initializeApp(environment.firebase);
    const analytics = getAnalytics(this._app);
  }

  getFirebaseApp(): FirebaseApp {
    if (!this._app) {
      throw new Error('FirebaseApp is not initialized');
    }

    return this._app;
  }
}
