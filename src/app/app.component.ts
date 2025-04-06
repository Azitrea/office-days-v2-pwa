import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './service/firebase/firebase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'office-days-v2';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.initializeFirebase();

    this.firebaseService.getMessagePayloadObservable().subscribe();

    this.firebaseService.requestPermission();
    this.firebaseService.listen();
  }
}
