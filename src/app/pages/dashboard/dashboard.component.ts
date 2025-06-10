import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MessagePayload } from 'firebase/messaging';
import { FirebaseService } from '../../service/firebase/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
firebaseMessagesSignal: Signal<MessagePayload | undefined>;
  isFirebaseMessagignActive: Signal<boolean | undefined>;

  constructor(private firebaseService: FirebaseService) {
    this.firebaseMessagesSignal = toSignal(
      this.firebaseService.getMessagePayloadObservable()
    );

    this.isFirebaseMessagignActive = toSignal(
      this.firebaseService.isFirebaseMessagignActive()
    );
  }

  ngOnInit(): void {
    this.firebaseService.initializeFirebase();
    if (this.isFirebaseMessagignActive && this.isFirebaseMessagignActive()) {
      this.subscribeToMessages();
    }
  }

  subscribeToMessages(): void {
    this.firebaseService.requestPermission();
    this.firebaseService.listen();
  }

  unsubscribeFromMessages(): void {
    this.firebaseService.deleteUserMessageSubscription();
  }
}
