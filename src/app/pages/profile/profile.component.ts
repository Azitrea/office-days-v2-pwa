import { Component, Signal } from '@angular/core';
import { FirebaseAuthService } from '../../service/firebase-auth/firebase-auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { toSignal } from '@angular/core/rxjs-interop';

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
    private router: Router
  ) {
    this.currentUser = toSignal(this.firebaseAuthService.user$);
  }

  navigateToDashboard(): void {
    this.router.navigateByUrl('');
  }

  async signOut(): Promise<void> {
    await this.firebaseAuthService.signOut();
    this.router.navigateByUrl('/login');
  }
}
