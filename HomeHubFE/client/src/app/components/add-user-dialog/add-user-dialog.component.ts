import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { StorageResponse } from '../../models/storageResponse';

export interface AddUserDialogData {
  houses: StorageResponse[];
}

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatButton,
    MatSelectModule
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent {
  userForm: FormGroup;
  houses: StorageResponse[];

  constructor(
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AddUserDialogData
  ) {
    this.houses = data.houses;

    this.userForm = this.fb.group({
      houseId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.userForm.valid) {
      const { houseId, email } = this.userForm.value;
      this.dialogRef.close({ houseId, email });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
