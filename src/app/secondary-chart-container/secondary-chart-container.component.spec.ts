import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryChartContainerComponent } from './secondary-chart-container.component';

describe('SecondaryChartContainerComponent', () => {
  let component: SecondaryChartContainerComponent;
  let fixture: ComponentFixture<SecondaryChartContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryChartContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryChartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
