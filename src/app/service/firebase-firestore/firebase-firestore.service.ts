import { inject, Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getDocsFromServer,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';
import { UserDetails } from '../../model/user-details.model';

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
      const tokenDoc = await getDoc(tokenRef);
      if (tokenDoc.exists()) {
        return;
      }

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

  async initializeUserIfFirstLogin() {
    const currentUser = this.firebaseAuthService.currentUser;

    if (!currentUser) return;

    const userRef = doc(this._firestore, `users/${currentUser.uid}`);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // First login — create initial user data
      const userData = {
        createdAt: new Date(),
        details: {
          receiveMessages: true,
        },
      };

      await setDoc(userRef, userData);
      console.log('User initialized in Firestore');
    } else {
      console.log('User already exists — no need to initialize');
    }
  }

  async updateUserDetails(details: Partial<UserDetails>): Promise<void> {
    const userRef = doc(
      this._firestore,
      `users/${this.firebaseAuthService.currentUser?.uid}`
    );

    try {
      await updateDoc(userRef, {
        details: {
          ...details,
        },
      });
      console.log('Value added', details);
    } catch (error) {
      console.error('Error deleting token from Firestore', error);
    }
  }

  async getUserDetails(): Promise<any> {
    const userDetailsRef = doc(
      this._firestore,
      `users/${this.firebaseAuthService.currentUser?.uid}`
    );

    try {
      const querySnapshot = await getDoc(userDetailsRef);
      const details = querySnapshot.data();

      // console.log('Details', details);
      return details;
    } catch (error) {
      console.error('Error getting user detalis', error);
    }
  }
}
