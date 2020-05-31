import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutManageComponent } from './manage.component';

describe('WorkoutManageComponent', () => {
  let component: WorkoutManageComponent;
  let fixture: ComponentFixture<WorkoutManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
