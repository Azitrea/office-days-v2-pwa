import { Component, OnInit, Signal } from '@angular/core';
import { FirebaseAuthService } from '../../service/firebase-auth/firebase-auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { FirebaseMessagingService } from '../../service/firebase-messaging/firebase-messaging.service';
import { FirebaseFirestoreService } from '../../service/firebase-firestore/firebase-firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetails, UserProfileData } from '../../model/user-details.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  APP_VERSION: string = 'v1.0.6' as const;

  isLoading: boolean = false;
  isFirebaseMessagignActive: Signal<boolean | undefined>;
  isFirebaseMessagingSupported: Signal<boolean | undefined>;

  currentUser: Signal<User | null | undefined> | undefined;
  userDetails: UserProfileData | undefined;

  todayDay = new Date().getDay().toString();

  weekDays = [
    { name: 'Monday', day: '1' },
    { name: 'Tuesday', day: '2' },
    { name: 'Wednesday', day: '3' },
    { name: 'Thursday', day: '4' },
    { name: 'Friday', day: '5' },
    { name: 'Saturday', day: '6' },
    { name: 'Sunday', day: '0' },
  ];

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private firebaseMessagingService: FirebaseMessagingService,
    private firebaseFirestoreService: FirebaseFirestoreService,
    private router: Router
  ) {
    this.currentUser = toSignal(this.firebaseAuthService.user$);
    this.isFirebaseMessagignActive = toSignal(
      this.firebaseMessagingService.isFirebaseMessagignActive()
    );

    this.isFirebaseMessagingSupported = toSignal(
      this.firebaseMessagingService.isFirebaseMessagingSupported()
    );
  }

  ngOnInit(): void {
    const uid = this.firebaseAuthService.currentUser?.uid;
    if (!uid) return;
    this.firebaseFirestoreService.getUserDetails(uid).then((details) => {
      this.userDetails = details;
    });
  }

  inputChange(key: string | number, event: MatSlideToggleChange): void {
    this.updateUserDetail({ [key]: event.checked });
  }

  async updateUserDetail(details: Partial<UserDetails>): Promise<void> {
    const uid = this.firebaseAuthService.currentUser?.uid;
    if (this.isLoading || !uid || !this.userDetails) {
      return;
    }
    this.isLoading = true;
    this.userDetails.details = { ...this.userDetails.details, ...details };
    await this.firebaseFirestoreService.updateUserDetails(
      uid,
      this.userDetails.details
    );
    this.isLoading = false;
  }

  navigateToDashboard(): void {
    this.router.navigateByUrl('');
  }

  async signOut(): Promise<void> {
    const uid = this.firebaseAuthService.currentUser?.uid;
    if (!uid) {
      return;
    }
    this.isLoading = true;
    await this.firebaseMessagingService.deleteUserMessageSubscription(uid);
    this.firebaseMessagingService.clearFirebaseMessagingStatus();
    await this.firebaseFirestoreService.unsubscribeFromFirestoreMessages();
    await this.firebaseFirestoreService.unsubscribeFromFirestoreUsers();
    await this.firebaseAuthService.signOut();
    this.firebaseFirestoreService.clearMessagesAndUsers();
    this.router.navigateByUrl('/login');
    this.isLoading = false;
  }

  async subscribeToMessages(): Promise<void> {
    const uid = this.firebaseAuthService.currentUser?.uid;
    if (!uid) {
      return;
    }
    this.isLoading = true;
    await this.firebaseMessagingService.requestPermission(uid);
    this.firebaseMessagingService.listen();
    this.isLoading = false;
  }

  async unsubscribeFromMessages(): Promise<void> {
    const uid = this.firebaseAuthService.currentUser?.uid;
    if (!uid) {
      return;
    }
    this.isLoading = true;
    this.firebaseMessagingService.deleteUserMessageSubscription(uid);
    this.isLoading = false;
  }
}
