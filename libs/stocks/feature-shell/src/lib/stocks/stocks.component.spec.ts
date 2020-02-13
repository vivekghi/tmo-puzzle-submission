import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PriceQueryFacade, StocksDataAccessPriceQueryModule } from '@coding-challenge/stocks/data-access-price-query';
import { EffectsModule, Actions } from '@ngrx/effects';
import { StoreModule, Store, MemoizedSelector } from '@ngrx/store';
import { StocksAppConfigToken } from '@coding-challenge/stocks/data-access-app-config';
import { DataPersistence } from '@nrwl/nx';
import { FakeDataPersistence } from './fake-data-persistence';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,

        SharedUiChartModule,
        StocksDataAccessPriceQueryModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        BrowserAnimationsModule

      ],

      declarations: [ StocksComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ 
        provide: StocksAppConfigToken,
        useValue: {
          production: false,
          apiKey: '',
          apiURL: 'https://sandbox.iexapis.com'
        } 
      },
      DataPersistence,
      Actions


      ]
    })
    .compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
