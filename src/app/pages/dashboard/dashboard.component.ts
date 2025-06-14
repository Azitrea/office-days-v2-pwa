import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MessagePayload } from 'firebase/messaging';
import { CommonModule } from '@angular/common';
import { FirebaseMessagingService } from '../../service/firebase-messaging/firebase-messaging.service';
import { Router } from '@angular/router';
import { FirebaseFirestoreService } from '../../service/firebase-firestore/firebase-firestore.service';
import { FirebaseAuthService } from '../../service/firebase-auth/firebase-auth.service';
import { FirebaseFunctionsService } from '../../service/firebase-functions/firebase-functions.service';
import { UserProfileData } from '../../model/user-details.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  firebaseMessagesSignal: Signal<MessagePayload | undefined>;
  isFirebaseMessagignActive: Signal<boolean | undefined>;

  isLoading: boolean = false;

  allUsers: UserProfileData[] = [];

  constructor(
    private firebaseMessagingService: FirebaseMessagingService,
    private firebaseAuthService: FirebaseAuthService,
    private firebaseFirestore: FirebaseFirestoreService,
    private firebaseFunctions: FirebaseFunctionsService,
    private router: Router
  ) {
    this.firebaseMessagesSignal = toSignal(
      this.firebaseMessagingService.getMessagePayloadObservable()
    );

    this.isFirebaseMessagignActive = toSignal(
      this.firebaseMessagingService.isFirebaseMessagignActive()
    );
  }

  ngOnInit(): void {
    if (
      this.isFirebaseMessagignActive &&
      this.isFirebaseMessagignActive() &&
      !this.firebaseMessagingService.isFirebaseMessagingInitialized
    ) {
      this._subscribeToMessages();
    }

    this.firebaseFirestore.getAllUsers().then((res) => (this.allUsers = res));
  }

  private async _subscribeToMessages(): Promise<void> {
    const uid = this.firebaseAuthService.currentUser?.uid;
    if (!uid) {
      return;
    }
    await this.firebaseMessagingService.requestPermission(uid);
    this.firebaseMessagingService.listen();
  }

  navigateToProfile(): void {
    this.router.navigateByUrl('profile');
  }

  async sendMessage(): Promise<void> {
    this.isLoading = true;
    const userIDs = this.allUsers.map((user) => user.id);
    await this.firebaseFunctions.sendNotificationToUsers(
      userIDs as string[],
      'Cigi?',
      `From: ${this.firebaseAuthService.currentUser?.displayName}`
    );
    this.isLoading = false;
  }
}
