import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { StorageType } from '../../models/storageResponse';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

export interface AddStorageDialogData {
  storageType: StorageType;
}

@Component({
  selector: 'app-add-storage-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatInputModule,
    MatButton
  ],
  templateUrl: './add-storage-dialog.component.html',
  styleUrl: './add-storage-dialog.component.scss'
})
export class AddStorageDialogComponent {
  storageForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddStorageDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AddStorageDialogData
  ) {
    this.storageForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: [data.storageType, Validators.required]
    });
  }

  submit() {
    if (this.storageForm.valid) {
      this.dialogRef.close(this.storageForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

  getStorageTypeString(): string {
    return StorageType[this.data.storageType];
  }
}
