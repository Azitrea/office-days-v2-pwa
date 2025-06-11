import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MessagePayload } from 'firebase/messaging';
import { CommonModule } from '@angular/common';
import { FirebaseMessagingService } from '../../service/firebase-messaging/firebase-messaging.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  firebaseMessagesSignal: Signal<MessagePayload | undefined>;
  isFirebaseMessagignActive: Signal<boolean | undefined>;

  isLoading: boolean = false;

  constructor(
    private firebaseMessagingService: FirebaseMessagingService,
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
      this.subscribeToMessages();
    }
  }

  async subscribeToMessages(): Promise<void> {
    this.isLoading = true;
    await this.firebaseMessagingService.requestPermission();
    this.firebaseMessagingService.listen();
    this.isLoading = false;
  }

  async unsubscribeFromMessages(): Promise<void> {
    this.isLoading = true;
    this.firebaseMessagingService.deleteUserMessageSubscription();
    this.isLoading = false;
  }

  navigateToProfile(): void {
    this.router.navigateByUrl('profile');
  }
}
