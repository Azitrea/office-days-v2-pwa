import { Component } from '@angular/core';
import { FirebaseAuthService } from '../../service/firebase-auth/firebase-auth.service';
import { Router } from '@angular/router';
import { FirebaseFirestoreService } from '../../service/firebase-firestore/firebase-firestore.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading: boolean = false;

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private firebaseFirestoreService: FirebaseFirestoreService,
    private router: Router
  ) {}

  async signInWithGoogle(): Promise<void> {
    this.isLoading = true;
    const user = await this.firebaseAuthService.signInWithGoogle();
    console.log(user);

    if (user) {
      await this.firebaseFirestoreService.initializeUserIfFirstLogin();
      this.router.navigateByUrl('');
    }
    this.isLoading = false;
  }
}
