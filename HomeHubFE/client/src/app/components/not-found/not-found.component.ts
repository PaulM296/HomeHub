import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("404 Not Found");
  }
}
