import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './service/firebase/firebase.service';
import { Observable } from 'rxjs';
import { MessagePayload } from 'firebase/messaging';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'office-days-v2';

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
