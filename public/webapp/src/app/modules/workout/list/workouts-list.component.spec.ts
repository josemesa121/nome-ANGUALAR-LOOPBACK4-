import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsListComponent } from './workouts-list.component';

describe('ListComponent', () => {
  let component: WorkoutsListComponent;
  let fixture: ComponentFixture<WorkoutsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
