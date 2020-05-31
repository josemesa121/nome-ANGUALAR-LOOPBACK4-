import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth.guard';

import { MainLayoutComponent } from '../../layouts/main-layout.component';

import { WorkoutsEditComponent } from './edit/workouts-edit.component';
import { WorkoutsViewComponent } from './view/workouts-view.component';
import { WorkoutsListComponent } from './list/workouts-list.component';
import { WorkoutDashboardComponent } from './dashboard/dashboard.component';
import { WorkoutManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
    path: 'workouts',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: WorkoutDashboardComponent,
        canActivate: [Auth],
        data: {
          // Uses static text (Home)
          breadcrumbs: 'Home'
        }
      },
      {
        path: 'view/:id',
        component: WorkoutsViewComponent,
        canActivate: [Auth],
        data: {
          // Uses static text (Home)
          breadcrumbs: 'Home'
        }

      },
      {
        path: 'create',
        component: WorkoutManageComponent,
        canActivate: [Auth],
        data: {
          // Uses static text (Home)
          breadcrumbs: 'Home'
        }
      },
      {
        path: 'edit/:id',
        component: WorkoutManageComponent,
        canActivate: [Auth],
        data: {
          // Uses static text (Home)
          breadcrumbs: 'Home'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class WorkoutsModuleRoutingModule { }
