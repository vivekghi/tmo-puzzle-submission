import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import {timeperiodsInventory, StocksUtil} from './util/stocks-util';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  maxDate:Date;
  minDate: Date;

  quotes$ = this.priceQuery.priceQueries$;

  // timePeriods = [
  //   { viewValue: 'All available data', value: 'max' },
  //   { viewValue: 'Five years', value: '5y' },
  //   { viewValue: 'Two years', value: '2y' },
  //   { viewValue: 'One year', value: '1y' },
  //   { viewValue: 'Year-to-date', value: 'ytd' },
  //   { viewValue: 'Six months', value: '6m' },
  //   { viewValue: 'Three months', value: '3m' },
  //   { viewValue: 'One month', value: '1m' }
  // ];
  timePeriods = timeperiodsInventory;
  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    // this.stockPickerForm = fb.group({
    //   symbol: [null, Validators.required],
    //   period: [null, Validators.required]
    // });
  }

  ngOnInit() {
    this.stockPickerForm = this.fb.group({
      symbol: [null, {validators: [Validators.required],updateOn: "blur"}],
      period: [null, {validators: [Validators.required],updateOn: "blur"}],
      startDate: [{value:null, disabled:true}],
      endDate: [{value:null,disabled:true}]
    });
    // this.stockPickerForm.valueChanges.subscribe(() => {
    //   this.fetchQuote()});
    this.maxDate=new Date();
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period, startDate, endDate } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period, startDate, endDate);
    }
  }
  enableDate(form) {
    this.stockPickerForm.get('startDate').enable();
    this.stockPickerForm.get('endDate').enable();
    this.setminDate(form.value);
  }

  private setminDate(value) {    
    this.minDate = StocksUtil.getMinDateforCalendar(value);    
  }
}
