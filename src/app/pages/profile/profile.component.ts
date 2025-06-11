import { Component, OnInit, Signal } from '@angular/core';
import { FirebaseAuthService } from '../../service/firebase-auth/firebase-auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { FirebaseMessagingService } from '../../service/firebase-messaging/firebase-messaging.service';
import { FirebaseFirestoreService } from '../../service/firebase-firestore/firebase-firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetails, UserProfileData } from '../../model/user-details.model';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  currentUser: Signal<User | null | undefined> | undefined;
  userDetails: UserProfileData | undefined;

  isLoading: boolean = false;

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private firebaseMessagingService: FirebaseMessagingService,
    private firebaseFirestoreService: FirebaseFirestoreService,
    private router: Router
  ) {
    this.currentUser = toSignal(this.firebaseAuthService.user$);
  }

  ngOnInit(): void {
    this.firebaseFirestoreService.getUserDetails().then((details) => {
      this.userDetails = details;
    });
  }

  inputChange(event: any): void {
    this.updateUserDetail({ receiveMessages: event.target.checked });
  }

  async updateUserDetail(details: Partial<UserDetails>): Promise<void> {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    await this.firebaseFirestoreService.updateUserDetails(details);
    this.isLoading = false;
  }

  navigateToDashboard(): void {
    this.router.navigateByUrl('');
  }

  async signOut(): Promise<void> {
    this.isLoading = true;
    await this.firebaseMessagingService.deleteUserMessageSubscription();
    await this.firebaseAuthService.signOut();
    this.router.navigateByUrl('/login');
    this.isLoading = false;
  }
}
