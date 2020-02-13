import { async, TestBed } from '@angular/core/testing';
import { SharedUiChartModule } from './shared-ui-chart.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SharedUiChartModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiChartModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiChartModule).toBeDefined();
  });
});
