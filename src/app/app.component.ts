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
  fromRate: number = 278;
  toRate: number = 278;
  fromCountry: string = 'US Dollar';
  fromCountryCode: string = 'USD';
  toCountry: string = 'US Dollar';
  toCountryCode: string = 'USD';

  countries = [
    { rate: 1 / 278, name: 'US Dollar', code: 'USD' },
    { rate: 1 / 360.26, name: 'British Pound', code: 'GBP' },
    { rate: 1 / 1.83, name: 'Japanese Yen', code: 'JPY' },
    { rate: 1 / 300, name: 'Euro', code: 'EUR' },
    { rate: 1, name: 'Pakistani Rupee', code: 'PKR' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.currencyForm = this.fb.group({
      fromRate: [this.countries[0].rate],
      toRate: [this.countries[0].rate],
      fromAmount: [1],
      toAmount: [1],
    });

    this.currencyForm.get('fromRate')?.valueChanges.subscribe(() => {
      this.convertFromAmount();
      this.updateCountryNames();
    });

    this.currencyForm.get('toRate')?.valueChanges.subscribe(() => {
      this.convertToAmount();
      this.updateCountryNames();
    });

    this.currencyForm.get('fromAmount')?.valueChanges.subscribe(() => {
      this.convertFromAmount();
    });

    this.currencyForm.get('toAmount')?.valueChanges.subscribe(() => {
      this.convertToAmount();
    });

    const savedData = localStorage.getItem('currencyData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.currencyForm.patchValue(parsedData);

      const fromCountry = this.countries.find(
        (country) => country.rate === parsedData.fromRate
      );
      const toCountry = this.countries.find(
        (country) => country.rate === parsedData.toRate
      );

      if (fromCountry) {
        this.fromCountry = fromCountry.name;
        this.fromCountryCode = fromCountry.code;
      }
      if (toCountry) {
        this.toCountry = toCountry.name;
        this.toCountryCode = toCountry.code;
      }
    }
  }

  convertFromAmount(): void {
    const fromAmount = this.currencyForm.get('fromAmount')!.value;
    const fromRate = this.currencyForm.get('fromRate')!.value;
    const toRate = this.currencyForm.get('toRate')!.value;

    const toAmount = (fromAmount * toRate) / fromRate;
    this.currencyForm
      .get('toAmount')!
      .setValue(toAmount.toFixed(4), { emitEvent: false });
  }

  convertToAmount(): void {
    const toAmount = this.currencyForm.get('toAmount')!.value;
    const fromRate = this.currencyForm.get('fromRate')!.value;
    const toRate = this.currencyForm.get('toRate')!.value;

    const fromAmount = (toAmount * fromRate) / toRate;
    this.currencyForm
      .get('fromAmount')!
      .setValue(fromAmount.toFixed(4), { emitEvent: false });
  }

  updateCountryNames(): void {
    const fromRateValue = this.currencyForm.get('fromRate')!.value;
    const toRateValue = this.currencyForm.get('toRate')!.value;

    const fromCountry = this.countries.find(
      (country) => country.rate === fromRateValue
    );
    const toCountry = this.countries.find(
      (country) => country.rate === toRateValue
    );

    this.fromCountry = fromCountry ? fromCountry.name : '-';
    this.fromCountryCode = fromCountry ? fromCountry.code : '-';
    this.toCountry = toCountry ? toCountry.name : '-';
    this.toCountryCode = toCountry ? toCountry.code : '-';
  }

  submit(): void {
    localStorage.setItem(
      'currencyData',
      JSON.stringify(this.currencyForm.value)
    );
  }
}
