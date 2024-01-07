import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JiraService {
  protected constructor(
    protected httpClient: HttpClient,
  ) { }

  protected readonly APIUrl = 'http://localhost:3000/api/jira';
  testConnection() {
    return this.httpClient.get(`${this.APIUrl}/test`);
  }
}
