import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: WorkoutDashboardComponent;
  let fixture: ComponentFixture<WorkoutDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
