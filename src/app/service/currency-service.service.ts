import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyServiceService {
  private apiUrl = 'https://api.currencyapi.com/v3/latest';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/symbols`);
  }

  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/convert`, {
      params: { from, to, amount: amount.toString() },
    });
  }
}
