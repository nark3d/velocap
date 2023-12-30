import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from '../../modules/alert/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractHttpService<T> {
  protected readonly APIUrl = 'http://localhost:3000/api' + this.getResourceUrl();
  abstract getResourceUrl(): string;

  protected constructor(
    protected httpClient: HttpClient,
    private notificationService: NotificationService
  ) { }

  toServerModel(entity: T): any {
    return entity;
  }

  fromServerModel(json: any): T {
    return json;
  }

  public getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.APIUrl).pipe(
      catchError(error => this.handleError(error))
    );
  }

  public get(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.APIUrl}/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  public insert(entity: T): Observable<T> {
    return this.httpClient.post<T>(this.APIUrl, entity).pipe(
      catchError(error => this.handleError(error))
    );
  }

  public handleError(error: HttpErrorResponse) {
    this.notificationService.error(error.message);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
