import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-storage-card',
  standalone: true,
  imports: [
    MatCard, 
    MatCardHeader,
    MatIcon,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions
  ],
  templateUrl: './storage-card.component.html',
  styleUrl: './storage-card.component.scss'
})
export class StorageCardComponent {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() icon: string = 'home';
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
