import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryChartComponent } from './secondary-chart.component';

describe('SecondaryChartComponent', () => {
  let component: SecondaryChartComponent;
  let fixture: ComponentFixture<SecondaryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
