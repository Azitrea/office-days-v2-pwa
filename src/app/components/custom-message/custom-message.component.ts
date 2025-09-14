import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-custom-message',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './custom-message.component.html',
  styleUrl: './custom-message.component.scss',
})
export class CustomMessageComponent implements OnInit {
  @Input() currentUserDisplayName: string | null | undefined;

  customMessageForm?: FormGroup;

  readonly VALID_MESSAGE_TITLE_LENGTH = 40;
  readonly VALID_MESSAGE_BODY_LENGTH = 150;

  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CustomMessageComponent>,
    private destoryRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const defaultMessageTitle = 'Cigi?';
    const defaultMessageBody = `From: ${this.currentUserDisplayName}`;

    const messageTitleValue =
      this._getItemFormStorage('messageTitle') ?? defaultMessageTitle;
    const messageBodyValue =
      this._getItemFormStorage('messageBody') ?? defaultMessageBody;

    this.customMessageForm = this.formBuilder.group({
      messageTitle: [messageTitleValue, Validators.required],
      messageBody: [messageBodyValue, Validators.required],
      theme: [null],
    });

    // this._subscribeAndSaveToStorage('messageTitle');
    // this._subscribeAndSaveToStorage('messageBody');
  }

  close(): void {
    this.dialogRef.close();
  }

  sendMessage(): void {
    if (!this.customMessageForm || this.customMessageForm.invalid) return;

    this._saveToLocalStorage('messageTitle');
    this._saveToLocalStorage('messageBody');

    this.dialogRef.close(this.customMessageForm.value);
  }

  private _subscribeAndSaveToStorage(key: string): void {
    if (!this.customMessageForm) return;

    const combinedKey = `office_days_${key}`;
    this.customMessageForm.controls[key].valueChanges
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe((value) => {
        localStorage.setItem(combinedKey, value);
      });
  }

  private _saveToLocalStorage(key: string): void {
    const combinedKey = `office_days_${key}`;
    if (!this.customMessageForm) return;
    const value = this.customMessageForm.controls[key].value;

    localStorage.setItem(combinedKey, value);
  }

  private _getItemFormStorage(key: string): string | null {
    const combinedKey = `office_days_${key}`;
    return localStorage.getItem(combinedKey);
  }
}

/** Error when invalid control is dirty, touched. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
