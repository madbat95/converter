import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'converter';
  fromAmount: number = 0;
  toAmount: number = 0;
  currencyForm!: FormGroup;
  convertedAmount!: number;
  rate: number = 278;
  selectedCountry: string = 'USA';
  countries: { rate: number; name: string }[] = [
    { rate: 278, name: 'USA' },
    { rate: 360.26, name: 'GBP' },
    { rate: 1.83, name: 'JPY' },
    { rate: 300, name: 'EUR' },
  ];
  constructor() {}

  ngOnInit(): void {}

  convertToPKR(): void {
    this.fromAmount = this.toAmount * this.rate;
  }

  convertTOUSD(): void {
    this.toAmount = this.fromAmount / this.rate;
  }
  onRateChange(event: any): void {
    const selected = this.countries.find(
      (country) => country.rate === event.value
    );
    if (selected) {
      this.selectedCountry = selected.name;
      this.convertTOUSD();
    }
  }
}
