import { CommonModule } from '@angular/common';
import { Component, computed, Input, Signal } from '@angular/core';
import { FirebaseFirestoreService } from '../../service/firebase-firestore/firebase-firestore.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AcceptDecline, FirebseStoredMessage } from '../../model/messages.model';
import { UserProfileData } from '../../model/user-details.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-response',
  imports: [CommonModule, MatIcon],
  templateUrl: './user-response.component.html',
  styleUrl: './user-response.component.scss',
})
export class UserResponseComponent {
  @Input() messageIndex: number = 0;

  allUsers: Signal<UserProfileData[] | undefined>;
  latestMessages: Signal<FirebseStoredMessage[] | undefined>;

  userResponses = computed(() => {
    const users = this.allUsers();
    const messages = this.latestMessages();
    if (!messages) return [];

    const acceptDecline = messages[this.messageIndex].acceptDecline;
    if (!acceptDecline) return [];
    const acceptDeclineKeys = Object.keys(acceptDecline);

    const result = [];
    for (const key of acceptDeclineKeys) {
      const user = users?.find((user) => user.id === key);
      result.push({ displayName: user?.displayName ?? key, acceptDecline: acceptDecline[key] === AcceptDecline.ACCEPT });
    }

    return result;
  });

  constructor(private firebaseFirestore: FirebaseFirestoreService) {
    this.allUsers = toSignal(
      this.firebaseFirestore.firestoreAllUsers.asObservable()
    );

    this.latestMessages = toSignal(
      this.firebaseFirestore.firestoreLatestMessages.asObservable()
    );
  }
}
