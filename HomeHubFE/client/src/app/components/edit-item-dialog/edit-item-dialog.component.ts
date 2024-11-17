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
import { ItemResponse } from '../../models/itemResponse';
import { UpdateItem } from '../../models/updateItem';

export interface EditItemDialogData {
  item: ItemResponse;
}

@Component({
  selector: 'app-edit-item-dialog',
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
  templateUrl: './edit-item-dialog.component.html',
  styleUrl: './edit-item-dialog.component.scss'
})
export class EditItemDialogComponent {
  itemForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditItemDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EditItemDialogData
  ) {
    const item = data.item;
    this.itemForm = this.fb.group({
      name: [item.name, Validators.required],
      count: [item.count, [Validators.required, Validators.min(1)]],
      description: [item.description, Validators.required],
      expirationDate: [item.expirationDate ? new Date(item.expirationDate) : null],
      warrantyDate: [item.warrantyDate ? new Date(item.warrantyDate) : null]
    });
  }

  submit() {
    if (this.itemForm.valid) {
      const formValue = this.itemForm.value;

      const formattedData: UpdateItem = {
        ...this.data.item,
        name: formValue.name,
        count: formValue.count,
        description: formValue.description,
        expirationDate: formValue.expirationDate ? this.formatDate(formValue.expirationDate) : null,
        warrantyDate: formValue.warrantyDate ? this.formatDate(formValue.warrantyDate) : null
      };

      this.dialogRef.close(formattedData);
    }
  }

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
