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
  private firebseService = inject(FirebaseService);

  private _auth = getAuth(this.firebseService.getFirebaseApp());

  private _userSubject = new BehaviorSubject<User | null | undefined>(undefined);
  user$ = this._userSubject.asObservable();

  constructor() {
    this._initializeAuth();
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this._auth, provider);
      return result.user;
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      throw error;
    }
  }

  async signOut() {
    await signOut(this._auth);
  }

  get currentUser() {
    return this._auth.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this._auth.currentUser;
  }

  private async _initializeAuth(): Promise<void> {
    await setPersistence(this._auth, browserLocalPersistence);
    onAuthStateChanged(this._auth, (user) => {
      this._userSubject.next(user);
    });
  }
}
