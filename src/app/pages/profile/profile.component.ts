import { Component, Signal } from '@angular/core';
import { FirebaseAuthService } from '../../service/firebase-auth/firebase-auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { FirebaseMessagingService } from '../../service/firebase-messaging/firebase-messaging.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  currentUser: Signal<User | null | undefined> | undefined;

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private firebaseMessagingService: FirebaseMessagingService,
    private router: Router
  ) {
    this.currentUser = toSignal(this.firebaseAuthService.user$);
  }

  navigateToDashboard(): void {
    this.router.navigateByUrl('');
  }

  async signOut(): Promise<void> {
    await this.firebaseMessagingService.deleteUserMessageSubscription();
    await this.firebaseAuthService.signOut();
    this.router.navigateByUrl('/login');
  }
}
