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
    if (this.isFirebaseMessagignActive && this.isFirebaseMessagignActive()) {
      this.subscribeToMessages();
    }
  }

  subscribeToMessages(): void {
    this.firebaseMessagingService.requestPermission();
    this.firebaseMessagingService.listen();
  }

  unsubscribeFromMessages(): void {
    this.firebaseMessagingService.deleteUserMessageSubscription();
  }

  navigateToProfile(): void {
    this.router.navigateByUrl('profile');
  }
}
