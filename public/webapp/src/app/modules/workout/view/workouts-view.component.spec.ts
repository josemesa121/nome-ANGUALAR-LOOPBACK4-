import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsViewComponent } from './workouts-view.component';

describe('ViewComponent', () => {
  let component: WorkoutsViewComponent;
  let fixture: ComponentFixture<WorkoutsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
