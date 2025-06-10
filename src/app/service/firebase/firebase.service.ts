import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  constructor() {}

  initializeFirebase(): void {
    // Initialize Firebase
    const app = initializeApp(environment.firebase);
    const analytics = getAnalytics(app);
  }
}
