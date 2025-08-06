import { Pipe, PipeTransform } from '@angular/core';
import { AcceptDecline } from '../../model/messages.model';
import { FirebaseAuthService } from '../../service/firebase-auth/firebase-auth.service';

@Pipe({
  name: 'acceptDeclineVoteHandler',
})
export class AcceptDeclineVoteHandlerPipe implements PipeTransform {
  constructor(private firebaseAuthService: FirebaseAuthService) {}

  transform(
    value: Record<string, string>,
    filter?: AcceptDecline | undefined
  ): boolean {
    const userID = this.firebaseAuthService.currentUser?.uid;
    if (!userID) return false;

    if (filter === undefined) {
      return value && value[userID] !== undefined;
    }

    if (filter === AcceptDecline.ACCEPT) {
      return value && value[userID] === AcceptDecline.ACCEPT;
    }

    if (filter === AcceptDecline.DECLINE) {
      return value && value[userID] === AcceptDecline.DECLINE;
    }

    return false;
  }
}
