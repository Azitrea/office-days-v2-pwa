import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseFirestoreService } from '../../service/firebase-firestore/firebase-firestore.service';
import { FirebaseAuthService } from '../../service/firebase-auth/firebase-auth.service';
import { FirebaseFunctionsService } from '../../service/firebase-functions/firebase-functions.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FirebseStoredMessage } from '../../model/messages.model';
import { UserProfileData } from '../../model/user-details.model';
import { FirebaseError } from 'firebase/app';
import { Timestamp } from 'firebase/firestore';
import { FirebaseMessagingService } from '../../service/firebase-messaging/firebase-messaging.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isLoading: boolean = false;

  allUsers: Signal<UserProfileData[] | undefined>;
  latestMessages: Signal<FirebseStoredMessage[] | undefined>;

  errorMessage: Record<string, string> | undefined;

  isFirebaseMessagingSupported: Signal<boolean | undefined>;

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private firebaseFirestore: FirebaseFirestoreService,
    private firebaseFunctions: FirebaseFunctionsService,
    private firebaseMessagingService: FirebaseMessagingService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.allUsers = toSignal(
      this.firebaseFirestore.firestoreAllUsers.asObservable()
    );

    this.latestMessages = toSignal(
      this.firebaseFirestore.firestoreLatestMessages.asObservable()
    );

    this.isFirebaseMessagingSupported = toSignal(
      this.firebaseMessagingService.isFirebaseMessagingSupported()
    );
  }

  ngOnInit(): void {}

  navigateToProfile(): void {
    this.router.navigateByUrl('profile');
  }

  async sendMessage(): Promise<void> {
    this.errorMessage = undefined;
    this.isLoading = true;

    try {
      // const userIDs = this.allUsers()?.map((user) => user.id) ?? [];
      const result = await this.firebaseFunctions.sendNotificationToUsers(
        '*', // userIDs as string[],
        'Cigi?',
        `From: ${this.firebaseAuthService.currentUser?.displayName}`
      );

      this.isLoading = false;
      this.showSnack('Successfully sent notification');
      console.log('Push sent:', result.data);
    } catch (error) {
      this.isLoading = false;
      const err = error as FirebaseError;

      this.errorMessage = { message: err.message };
      if (
        err.code === 'functions/resource-exhausted' &&
        (err as any).details?.nextMessageCanBeSent !== undefined
      ) {
        const timeStamp = (err as any).details.nextMessageCanBeSent;
        const time = new Timestamp(timeStamp._seconds, timeStamp._nanoseconds);

        this.errorMessage['nextMessageCanBeSent'] = time.toDate().toString();
      }

      console.error('Error sending push:', error, err.code);
      this.showSnack('Failed to send notification', true);
    }
  }

  showSnack(message: string, isError: boolean = false) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      panelClass: isError
        ? ['bg-red-600', 'text-white']
        : ['bg-green-600', 'text-white'],
    });
  }
}
