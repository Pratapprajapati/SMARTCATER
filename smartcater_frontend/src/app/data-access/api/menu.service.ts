import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IMenuModel } from '../interface/i-menumodel';
import { IResponseDto } from '../interface/i-response-dto';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = 'http://localhost:8080/api/orders';
  // customerId: string;

  constructor(private http: HttpClient) {
    // this.customerId = localStorage.getItem('userId');
  }

  getData(): Observable<any> {
    // const headers = this.setHeader();
    const tokenValue: string = localStorage.getItem('adminToken'); // Fetch token from localStorage

    if (!tokenValue) {
      // Return an observable that emits an error if token or customerId is missing
      return throwError(
        () => new Error('No token or customer ID found. Please log in again.')
      );
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenValue}`, // Add token to headers
    });
    return this.http.get(`${this.apiUrl}`, {
      headers: headers,
    });
  }

  getOrders(): Observable<any> {
    // const headers = this.setHeader();
    const tokenValue: string = localStorage.getItem('token'); // Fetch token from localStorage

    if (!tokenValue) {
      // Return an observable that emits an error if token or customerId is missing
      return throwError(
        () => new Error('No token or customer ID found. Please log in again.')
      );
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenValue}`, // Add token to headers
    });
    return this.http.get(`${this.apiUrl}`, {
      headers: headers,
    });
  }
  createOrder(order: IMenuModel): Observable<IResponseDto> {
    const tokenValue: string = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenValue}`,
    });
    const customerId: string = localStorage.getItem('userId'); // Fetch customerId from localStorage

    order.customerId  = customerId;
    return this.http.post(`${this.apiUrl}`, order, { headers: null });
  }

  getUpcomingOrders(): Observable<any> {
    const headers = this.setHeader();
    const customerId: string | null = localStorage.getItem('userId'); // Ensure it exists
  
    if (!customerId) {
      console.error("Customer ID not found in localStorage");
      return of([]); // Return an empty observable to prevent errors
    }
  
    return this.http.get(`${this.apiUrl}/${customerId}`, { headers });
  }
  

  setHeader(): HttpHeaders | any {
    const tokenValue: string = localStorage.getItem('token'); // Fetch token from localStorage

    if (!tokenValue) {
      // Return an observable that emits an error if token or customerId is missing
      return throwError(
        () => new Error('No token or customer ID found. Please log in again.')
      );
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenValue}`, // Add token to headers
    });
    return headers;
  }
}
