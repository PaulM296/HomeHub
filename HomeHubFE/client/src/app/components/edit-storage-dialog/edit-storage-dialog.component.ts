import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StorageResponse, StorageType } from '../../models/storageResponse';
import { UpdateStorage } from '../../models/updateStorage';

export interface EditStorageDialogData {
  storageType: StorageType;
  storage: StorageResponse;
}


@Component({
  selector: 'app-edit-storage-dialog',
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
  templateUrl: './edit-storage-dialog.component.html',
  styleUrl: './edit-storage-dialog.component.scss'
})
export class EditStorageDialogComponent implements OnInit {
  editForm: FormGroup;
  storageType: StorageType;

  constructor(
    private dialogRef: MatDialogRef<EditStorageDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EditStorageDialogData
  ) {
    this.storageType = data.storageType;
    this.editForm = this.fb.group({
      name: [data.storage.name, Validators.required],
      description: [data.storage.description, Validators.required]
    });
  }

  ngOnInit(): void {}

  submit() {
    if (this.editForm.valid) {
      const updatedData: UpdateStorage = {
        name: this.editForm.value.name,
        description: this.editForm.value.description
      };
      this.dialogRef.close(updatedData);
    }
  }

  close() {
    this.dialogRef.close();
  }

  getTitle(): string {
    return `Edit ${StorageType[this.storageType]}`;
  }
}
