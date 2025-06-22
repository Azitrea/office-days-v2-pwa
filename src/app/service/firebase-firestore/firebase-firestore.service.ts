import { inject, Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { FirebaseService } from '../firebase/firebase.service';
import { UserDetails, UserProfileData } from '../../model/user-details.model';
import { User } from 'firebase/auth';
import { FirebseStoredMessage } from '../../model/messages.model';
import { BehaviorSubject } from 'rxjs';

const MESSAGES_LIMIT = 3;

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestoreService {
  private firebseService = inject(FirebaseService);

  private _firestore = getFirestore(this.firebseService.getFirebaseApp());

  private _firestoreMessageLogsUnsub: Unsubscribe | undefined;
  private _firestoreUsersUnsub: Unsubscribe | undefined;

  userDetails = new BehaviorSubject<UserProfileData | undefined>(undefined);
  firestoreAllUsers = new BehaviorSubject<UserProfileData[] | undefined>(
    undefined
  );
  firestoreLatestMessages = new BehaviorSubject<
    FirebseStoredMessage[] | undefined
  >(undefined);

  constructor() {}

  async saveTokenToFirestore(userID: string, token: string): Promise<void> {
    const tokenRef = doc(this._firestore, `users/${userID}/fcmTokens/${token}`);

    try {
      const tokenDoc = await getDoc(tokenRef);
      if (tokenDoc.exists()) {
        console.log('Token exists in storage');
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
      // console.log('Value added', details);
    } catch (error) {
      console.error('Error deleting token from Firestore', error);
    }
  }

  async getUserDetails(
    userID: string,
    force: boolean = false
  ): Promise<UserProfileData | undefined> {
    if (this.userDetails.value !== undefined && force === false) {
      return this.userDetails.value;
    }
    const userDetailsRef = doc(this._firestore, `users/${userID}`);

    try {
      const querySnapshot = await getDoc(userDetailsRef);
      const details = querySnapshot.data() as UserProfileData;

      this.userDetails.next(details);
      return details;
    } catch (error) {
      console.error('Error getting user detalis', error);
      return undefined;
    }
  }

  async getAllUsers(force: boolean = false): Promise<UserProfileData[]> {
    if (this.firestoreAllUsers.value !== undefined && force === false) {
      return this.firestoreAllUsers.value;
    }

    const usersCol = collection(this._firestore, 'users');
    const snapshot = await getDocs(usersCol);

    const mappedUsers = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as UserProfileData)
    );

    this.firestoreAllUsers.next(mappedUsers);
    return mappedUsers;
  }

  async getLatestMessages(
    force: boolean = false
  ): Promise<FirebseStoredMessage[] | undefined> {
    if (this.firestoreLatestMessages.value !== undefined && force === false) {
      return this.firestoreLatestMessages.value;
    }

    const messageLogsRef = collection(this._firestore, 'messageLogs');
    const q = query(
      messageLogsRef,
      orderBy('createdAt', 'desc'),
      limit(MESSAGES_LIMIT)
    );

    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirebseStoredMessage[];

    if (messages.length === 0) {
      this.firestoreLatestMessages.next([]);
      return [];
    }

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

    const mappedMessages = messages.map((msg) => ({
      ...msg,
      displayName:
        users.find((u) => msg.userId === u.id)?.displayName ?? msg.userId,
    }));

    this.firestoreLatestMessages.next(mappedMessages);
    return mappedMessages;
  }

  async unsubscribeFromFirestoreMessages(): Promise<void> {
    if (this._firestoreMessageLogsUnsub) {
      this._firestoreMessageLogsUnsub();
      this._firestoreMessageLogsUnsub = undefined;
    }
  }

  async subscribeToLatestMessages(): Promise<void> {
    const messageLogsRef = collection(this._firestore, 'messageLogs');
    const q = query(
      messageLogsRef,
      orderBy('createdAt', 'desc'),
      limit(MESSAGES_LIMIT)
    );

    this._firestoreMessageLogsUnsub = onSnapshot(q, async (snapshot) => {
      if (this.firestoreAllUsers.value === undefined) {
        await this.getAllUsers();
      }

      if (this.firestoreLatestMessages.value === undefined) {
        await this.getLatestMessages();
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          let value = this.firestoreLatestMessages.value;
          if (value === undefined) value = [];

          const newMessage = change.doc.data() as FirebseStoredMessage;
          newMessage['id'] = change.doc.id;
          newMessage['displayName'] =
            this.firestoreAllUsers.value?.find(
              (u) => newMessage.userId === u.id
            )?.displayName ?? newMessage.userId;

          value?.unshift(newMessage);
          this.firestoreLatestMessages.next(value);
        }
        if (change.type === 'modified') {
          console.log('Modified doc: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed doc: ', change.doc.id);

          const value = this.firestoreLatestMessages.value;
          if (value === undefined) {
            return;
          }

          const messageToRemoveID = change.doc.id;
          const index = value.findIndex((msg) => msg.id === messageToRemoveID);
          value.splice(index, 1);

          this.firestoreLatestMessages.next(value);
        }
      });
    });
  }

  async unsubscribeFromFirestoreUsers(): Promise<void> {
    if (this._firestoreUsersUnsub) {
      this._firestoreUsersUnsub();
      this._firestoreUsersUnsub = undefined;
    }
  }

  async subscribeToUsers(): Promise<void> {
    const usersColl = collection(this._firestore, 'users');

    this._firestoreUsersUnsub = onSnapshot(usersColl, (snapshot) => {
      if (this.firestoreAllUsers.value === undefined) {
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          console.log('New user: ', change.doc.data());
          let value = this.firestoreAllUsers.value;
          if (value === undefined) value = [];

          const newUser = change.doc.data() as UserProfileData;
          newUser['id'] = change.doc.id;
          value.unshift(newUser);

          this.firestoreAllUsers.next(value);
        }
        if (change.type === 'modified') {
          console.log('Modified user: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed user: ', change.doc.data());
        }
      });
    });
  }

  clearMessagesAndUsers(): void {
    this.userDetails.next(undefined);
    this.firestoreAllUsers.next(undefined);
    this.firestoreLatestMessages.next(undefined);
  }
}
