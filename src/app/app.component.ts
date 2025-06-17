import { Component, DestroyRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from './service/firebase-auth/firebase-auth.service';
import { distinctUntilChanged, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FirebaseMessagingService } from './service/firebase-messaging/firebase-messaging.service';
import { FirebaseFirestoreService } from './service/firebase-firestore/firebase-firestore.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { MessagePayload } from 'firebase/messaging';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'office-days-v2';

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private firebaseMessagingService: FirebaseMessagingService,
    private firebaseFirestore: FirebaseFirestoreService,
    private destroyRef: DestroyRef,
    private dialog: MatDialog
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
        this.firebaseFirestore.subscribeToLatestMessages();
        this.firebaseFirestore.subscribeToUsers();
      });

    this.firebaseMessagingService
      .getMessagePayloadObservable()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((_msg) => {
        console.log('payload', _msg);
        this._openDialog(_msg);
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

  private _openDialog(_msg: MessagePayload): void {
    this.dialog.closeAll();

    let dialogRef = this.dialog.open(NewMessageComponent);

    dialogRef.componentInstance.title = _msg.notification?.title;
    dialogRef.componentInstance.body = _msg.notification?.body;
    dialogRef.componentInstance.date = new Date();
  }
}
