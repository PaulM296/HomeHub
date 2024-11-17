import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

export interface AddItemDialogData {
}

@Component({
  selector: 'app-add-item-dialog',
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.scss'
})
export class AddItemDialogComponent {
  itemForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddItemDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AddItemDialogData
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      count: [1, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      expirationDate: [null],
      warrantyDate: [null]
    });
  }

  submit() {
    if (this.itemForm.valid) {
      const formValue = this.itemForm.value;
  
      const formattedData = {
        ...formValue,
        expirationDate: formValue.expirationDate ? this.formatDate(formValue.expirationDate) : null,
        warrantyDate: formValue.warrantyDate ? this.formatDate(formValue.warrantyDate) : null
      };
  
      this.dialogRef.close(formattedData);
    }
  }
  
  // Utility method to format dates
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  close() {
    this.dialogRef.close();
  }
}
