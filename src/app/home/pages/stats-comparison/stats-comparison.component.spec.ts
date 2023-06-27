import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsComparisonComponent } from './stats-comparison.component';

describe('StatsComparisonComponent', () => {
  let component: StatsComparisonComponent;
  let fixture: ComponentFixture<StatsComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsComparisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
