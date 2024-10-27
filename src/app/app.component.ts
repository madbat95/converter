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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.currencyForm = this.fb.group({
      rate: [278],
      fromAmount: [0],
      toAmount: [0],
    });

    const savedData = localStorage.getItem('currencyData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.currencyForm.patchValue(parsedData);
      console.log(parsedData);

      const selectedCountry = this.countries.find(
        (country) => country.rate === parsedData.rate
      );
      if (selectedCountry) {
        this.selectedCountry = selectedCountry.name;
      }
    }

    this.currencyForm.get('rate')!.valueChanges.subscribe((rate) => {
      const selected = this.countries.find((country) => country.rate === rate);
      if (selected) {
        this.selectedCountry = selected.name;
      }
      this.convertToPKR();
    });

    this.currencyForm.get('fromAmount')!.valueChanges.subscribe(() => {
      this.convertToUSD();
    });

    this.currencyForm.get('toAmount')!.valueChanges.subscribe(() => {
      this.convertToPKR();
    });
  }

  convertToPKR(): void {
    const toAmount = this.currencyForm.get('toAmount')!.value;
    const rate = this.currencyForm.get('rate')!.value;
    this.currencyForm
      .get('fromAmount')!
      .setValue(toAmount * rate, { emitEvent: false });
  }

  convertToUSD(): void {
    const fromAmount = this.currencyForm.get('fromAmount')!.value;
    const rate = this.currencyForm.get('rate')!.value;
    this.currencyForm
      .get('toAmount')!
      .setValue(fromAmount / rate, { emitEvent: false });
  }
  submit(): void {
    const formData = this.currencyForm.value;
    localStorage.setItem('currencyData', JSON.stringify(formData));
    alert('Data saved to local storage!');
  }
}
