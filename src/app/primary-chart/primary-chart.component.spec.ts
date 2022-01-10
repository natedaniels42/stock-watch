import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryChartComponent } from './primary-chart.component';

describe('PrimaryChartComponent', () => {
  let component: PrimaryChartComponent;
  let fixture: ComponentFixture<PrimaryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
