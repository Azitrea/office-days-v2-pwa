import { inject, Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { FirebaseService } from '../firebase/firebase.service';
import { UserDetails, UserProfileData } from '../../model/user-details.model';
import { User } from 'firebase/auth';
import { FirebseStoredMessage } from '../../model/messages.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestoreService {
  private firebseService = inject(FirebaseService);

  private _firestore = getFirestore(this.firebseService.getFirebaseApp());

  constructor() {}

  async saveTokenToFirestore(userID: string, token: string): Promise<void> {
    const tokenRef = doc(this._firestore, `users/${userID}/fcmTokens/${token}`);

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

  async deleteTokenFromFirestore(userID: string, token: string): Promise<void> {
    const tokenRef = doc(this._firestore, `users/${userID}/fcmTokens/${token}`);

    try {
      await deleteDoc(tokenRef);
      console.log('Token deleted from Firestore', token);
    } catch (error) {
      console.error('Error deleting token from Firestore', error);
    }
  }

  async initializeUserIfFirstLogin(currentUser: User) {
    if (!currentUser) return;

    const userRef = doc(this._firestore, `users/${currentUser.uid}`);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // First login — create initial user data
      const userData = {
        createdAt: new Date(),
        displayName: currentUser.displayName,
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

  async updateUserDetails(
    userID: string,
    details: Partial<UserDetails>
  ): Promise<void> {
    const userRef = doc(this._firestore, `users/${userID}`);

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

  async getUserDetails(userID: string): Promise<any> {
    const userDetailsRef = doc(this._firestore, `users/${userID}`);

    try {
      const querySnapshot = await getDoc(userDetailsRef);
      const details = querySnapshot.data();

      // console.log('Details', details);
      return details;
    } catch (error) {
      console.error('Error getting user detalis', error);
    }
  }

  async getAllUsers(): Promise<UserProfileData[]> {
    const usersCol = collection(this._firestore, 'users');
    const snapshot = await getDocs(usersCol);

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as UserProfileData)
    );
  }

  async getLatestMessages(): Promise<any> {
    const messageLogsRef = collection(this._firestore, 'messageLogs');
    const q = query(messageLogsRef, orderBy('createdAt', 'desc'), limit(10));

    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirebseStoredMessage[];

    const array = messages.map((msg) => msg.userId);
    const userRef = await collection(this._firestore, 'users');
    const userQuery = query(userRef, where('__name__', 'in', array));

    const users = (await getDocs(userQuery)).docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as UserProfileData)
    );

    return messages.map((msg) => ({
      ...msg,
      displayName: users.find((u) => msg.userId === u.id)?.displayName ?? msg.userId,
    }));
  }
}
