import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamStatistics2Component } from './team-statistics2.component';

describe('TeamStatistics2Component', () => {
  let component: TeamStatistics2Component;
  let fixture: ComponentFixture<TeamStatistics2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamStatistics2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamStatistics2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
