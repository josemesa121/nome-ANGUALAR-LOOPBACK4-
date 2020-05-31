import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutListItemComponent } from './list-item.component';

describe('WorkoutListItemComponent', () => {
  let component: WorkoutListItemComponent;
  let fixture: ComponentFixture<WorkoutListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
