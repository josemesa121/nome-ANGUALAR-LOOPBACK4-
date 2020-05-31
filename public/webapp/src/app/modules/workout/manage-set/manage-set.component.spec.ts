import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutManageSetComponent } from './manage-set.component';

describe('WorkoutManageSetComponent', () => {
  let component: WorkoutManageSetComponent;
  let fixture: ComponentFixture<WorkoutManageSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutManageSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutManageSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
