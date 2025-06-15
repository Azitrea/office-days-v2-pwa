import { Component, DestroyRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from './service/firebase-auth/firebase-auth.service';
import { distinctUntilChanged, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FirebaseMessagingService } from './service/firebase-messaging/firebase-messaging.service';
import { FirebaseFirestoreService } from './service/firebase-firestore/firebase-firestore.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'office-days-v2';

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private firebaseMessagingService: FirebaseMessagingService,
    private firebaseFirestore: FirebaseFirestoreService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    // this.firebaseService.initializeFirebase();
    this.firebaseAuthService.user$
      .pipe(
        filter((user) => !!user),
        distinctUntilChanged((prev, next) => prev?.uid === next?.uid),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((_user) => {
        this._subscribeToMessages();
      });

    this.firebaseMessagingService
      .getMessagePayloadObservable()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((_msg) => {
        this.firebaseFirestore.getLatestMessages(true);

        // Todo - popup
      });
  }

  private async _subscribeToMessages(): Promise<void> {
    if (
      !this.firebaseMessagingService.isFirebaseMessagignActiveValue() ||
      this.firebaseMessagingService.isFirebaseMessagingInitialized
    ) {
      return;
    }

    const uid = this.firebaseAuthService.currentUser?.uid;
    if (!uid) {
      return;
    }
    await this.firebaseMessagingService.requestPermission(uid);
    this.firebaseMessagingService.listen();
  }
}
