import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutsModuleRoutingModule } from './workout-module.routing';
import { WorkoutsListComponent } from './list/workouts-list.component';
import { WorkoutsEditComponent } from './edit/workouts-edit.component';
import { WorkoutsViewComponent } from './view/workouts-view.component';
import { SharedModule } from '../../shared/shared.module';
import { WorkoutDashboardComponent } from './dashboard/dashboard.component';
import { WorkoutListItemComponent } from './list-item/list-item.component';
import { WorkoutManageComponent } from './manage/manage.component';
import { WorkoutManageSetComponent } from './manage-set/manage-set.component';

@NgModule({
  imports: [
    CommonModule,
    WorkoutsModuleRoutingModule,
    SharedModule
  ],
  declarations: [
    WorkoutsListComponent,
    WorkoutsEditComponent,
    WorkoutsViewComponent,
    WorkoutDashboardComponent,
    WorkoutListItemComponent,
    WorkoutManageComponent,
    WorkoutManageSetComponent
  ]
})
export class WorkoutsModule { }
