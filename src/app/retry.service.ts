import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, delay, catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetryService {
  private readonly MAX_RETRIES = 4;
  private readonly RETRY_DELAY = 2000;
  private currentRetry = 0;

  constructor(private http: HttpClient) {}

  fetchData(url: string, onRetry: (count: number) => void): Observable<any> {
    this.currentRetry = 0;
    
    return this.http.get(url).pipe(
      delay(this.RETRY_DELAY),
      tap(() => {
        this.currentRetry++;
        onRetry(this.currentRetry);
      }),
      retry({
        count: this.MAX_RETRIES - 1,
        delay: (error, retryCount) => {
          this.currentRetry = retryCount + 1;
          onRetry(this.currentRetry);
          return new Observable(subscriber => {
            setTimeout(() => {
              subscriber.next();
              subscriber.complete();
            }, this.RETRY_DELAY);
          });
        }
      }),
      catchError((error) => {
        return throwError(() => `URL incorrecte après ${this.currentRetry} tentatives : ${url}`);
      })
    );
  }
}