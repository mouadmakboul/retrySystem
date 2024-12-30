import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RetryService } from './retry.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgIf, JsonPipe, DatePipe, NgFor } from '@angular/common'; // Ajoutez NgFor ici

// Interface pour les tentatives
interface RetryAttempt {
  timestamp: Date;
  status: 'success' | 'failed' | 'pending';
  message: string;
  attemptNumber: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    NgFor,
    NgIf,
    JsonPipe,
    DatePipe
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent {
  url: string = 'https://jsonplaceholder.typicode.com/users';
  response: any = null;
  error: string | null = null;
  retryCount: number = 0;
  isLoading: boolean = false;
  maxRetries: number = 5;
  retryHistory: RetryAttempt[] = [];

  constructor(private retryService: RetryService) {}

  onSubmit() {
    this.retryCount = 0;
    this.response = null;
    this.error = null;
    this.isLoading = true;

    this.retryService.fetchData(this.url, (attemptCount: number) => {
      this.retryCount = attemptCount;
    }).subscribe({
      next: (data) => {
        this.response = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
      }
    });
  }
}