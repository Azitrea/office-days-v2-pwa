import { Component } from '@angular/core';
import { FirebaseAuthService } from '../../service/firebase-auth/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private router: Router
  ) {}

  async signInWithGoogle(): Promise<void> {
    const user = await this.firebaseAuthService.signInWithGoogle();
    console.log(user);

    if (user) {
      this.router.navigateByUrl('');
    }
  }
}
