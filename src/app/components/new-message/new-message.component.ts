import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-new-message',
  imports: [CommonModule, MatIconModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss',
})
export class NewMessageComponent {
  @Input() title: string | undefined;
  @Input() body: string | undefined;
  @Input() date!: Date;

  constructor(private matDialogRef: MatDialogRef<NewMessageComponent>) {}

  closeDialog() {
    this.matDialogRef.close();
  }
}
