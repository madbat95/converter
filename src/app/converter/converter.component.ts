import { Component } from '@angular/core';
import { CurrencyServiceService } from '../service/currency-service.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent {
  fromAmount: number = 0;
  exchangeRate: number = 278;
  toAmount: number = 0;

  constructor() {}

  convertCurrency(): void {
    this.toAmount = this.fromAmount * this.exchangeRate;
  }
}
