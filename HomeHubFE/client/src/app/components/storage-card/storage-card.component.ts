import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-storage-card',
  standalone: true,
  imports: [
    MatCard, 
    MatIcon,
    MatCardTitle,
    MatCardSubtitle,
    MatButton
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

  onEdit(event: MouseEvent) {
    event.stopPropagation();
    this.edit.emit();
  }

  onDelete(event: MouseEvent) {
    event.stopPropagation();
    this.delete.emit();
  }
}
