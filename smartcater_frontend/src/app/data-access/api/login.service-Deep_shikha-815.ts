import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AppCookieService } from '../../../shared/util/app-cookies.service';
import { IUser } from '../interface/i-user';
import { IResponseDto } from '../interface/i-response-dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Your Spring Boot backend URL

  constructor(
    private http: HttpClient,
    private cookiesService: AppCookieService
  ) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login and store user details
  login(credentials: IUser): Observable<IResponseDto> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Get the logged-in user's ID
  getLoggedInUserId(): string | null {
    const user = this.cookiesService.getEncryptedCookies('userId');
    return user ? JSON.parse(user).id : null;
  }

  // Logout the user
  logout(): void {
    this.cookiesService.logout();
  }

  // **Admin login method**
  adminLogin(admin: {
    username: string;
    password: string;
  }): Observable<IResponseDto> {
    return this.http.post(`http://localhost:8080/api/admin/login`, admin);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Check if token exists
  }

  checkTokenExist(): Observable<IResponseDto> {
    const tokenValue: string = localStorage.getItem('token');
   
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenValue}`,
    });
    return this.http.get(`${this.apiUrl}/check-auth`, { headers });
  }
}
