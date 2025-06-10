import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseService } from './service/firebase/firebase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'office-days-v2';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.initializeFirebase();
  }
}
