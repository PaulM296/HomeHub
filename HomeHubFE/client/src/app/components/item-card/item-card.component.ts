import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatIcon,
    MatCardTitle,
    MatCardSubtitle,
    MatButton
  ],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() icon: string ='';
  @Input() count: number | null = null;
  @Input() expirationDate: string | null = null;;
  @Input() warrantyDate: string | null = null;;
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
