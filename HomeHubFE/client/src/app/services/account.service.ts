import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/authResponse';
import { User } from '../models/user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${ environment.apiUrl }/users`;
  private http = inject(HttpClient);

login(email: string, password: string): Observable < AuthResponse > {
  return this.http.post<AuthResponse>(`${ this.apiUrl }/login`, { email, password });
}

register(user: User): Observable < AuthResponse > {
  return this.http.post<AuthResponse>(`${ this.apiUrl }/register`, user);
}
}