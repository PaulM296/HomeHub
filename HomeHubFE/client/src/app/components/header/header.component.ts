import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutConfirmationDialogComponent } from '../dialog-confirmation-dialog/logout-confirmation-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private dialog: MatDialog, private router: Router) { }

  onLogout(): void {
    const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        // Clear token and session data
        localStorage.removeItem('token');

        // Clear history and redirect
        this.router.navigate(['/login'], { replaceUrl: true }).then(() => {
          window.history.pushState(null, '', window.location.href);
          window.onpopstate = () => {
            window.history.pushState(null, '', window.location.href);
          };
        });
      }
    });
  }
}
