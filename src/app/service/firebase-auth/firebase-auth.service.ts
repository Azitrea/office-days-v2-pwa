import { inject, Injectable } from '@angular/core';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  firebseService = inject(FirebaseService);

  private auth = getAuth(this.firebseService.getFirebaseApp());

  private userSubject = new BehaviorSubject<User | null | undefined>(undefined);
  user$ = this.userSubject.asObservable();

  constructor() {
    this._initializeAuth();
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      throw error;
    }
  }

  async signOut() {
    await signOut(this.auth);
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }

  private async _initializeAuth(): Promise<void> {
    await setPersistence(this.auth, browserLocalPersistence);
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }
}
