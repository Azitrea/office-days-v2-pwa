import { inject, Injectable } from '@angular/core';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestoreService {
  private firebseService = inject(FirebaseService);
  private firebaseAuthService = inject(FirebaseAuthService);

  private _firestore = getFirestore(this.firebseService.getFirebaseApp());

  constructor() {}

  async saveTokenToFirestore(token: string): Promise<void> {
    const tokenRef = doc(
      this._firestore,
      `users/${this.firebaseAuthService.currentUser?.uid}/fcmTokens/${token}`
    );

    try {
      await setDoc(tokenRef, {
        userAgent: window?.navigator?.userAgent,
        token: token,
        createdAt: new Date(),
      });
      console.log('Token was set in Firestore');
    } catch (error) {
      console.error('Error deleting token from Firestore', error);
    }
  }

  async deleteTokenFromFirestore(token: string): Promise<void> {
    const tokenRef = doc(
      this._firestore,
      `users/${this.firebaseAuthService.currentUser?.uid}/fcmTokens/${token}`
    );

    try {
      await deleteDoc(tokenRef);
      console.log('Token deleted from Firestore', token);
    } catch (error) {
      console.error('Error deleting token from Firestore', error);
    }
  }
}
