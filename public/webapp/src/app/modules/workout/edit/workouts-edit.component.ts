import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { LoopBackAuth } from '../../../apiclient/services/';
import { Workout } from '../../../apiclient/models';
import { AccountApi, WorkoutApi } from '../../../apiclient/services/custom/';

@Component({
  selector: 'app-workouts-edit',
  templateUrl: './workouts-edit.component.html',
  styleUrls: ['./workouts-edit.component.css']
})
export class WorkoutsEditComponent implements OnInit {
  model: Partial<Workout>;
  isNewRecord: boolean;
  info: any[];
  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      className: 'form-group',
      templateOptions: {
        label: 'Name',
        placeholder: 'Name',
        required: true,
      }
    }
  ];

  constructor(
    private _notifications: NotificationsService,
    private loopBackAuth: LoopBackAuth,
    private router: Router,
    private route: ActivatedRoute,
    private accountApi: AccountApi,
    private workoutApi: WorkoutApi,
  ) {
    this.model = {} as Workout;
  }

  ngOnInit() {
    this.getModel();
  }

  getModel() {
    this.isNewRecord = true;
    this.model = {} as Workout;

    this.route.params.subscribe(params => {
      this.model.id = +params['id'];
      if (this.model.id) {
        this.workoutApi.findById(this.model.id).subscribe(
          workout => {
            this.model = workout;
            this.isNewRecord = false;
          }
        );
      }
    });
  }

  save(model) {
    if (this.isNewRecord) {
      model.accountId = this.loopBackAuth.getCurrentUserId();
      this.workoutApi.create(model).subscribe(
        record => {
          this.router.navigate(['/workouts/view', record.id]);
          this._notifications.info('Workout Created.');
        },
        error => {
          this._notifications.warn('Ooops!');
        }
      );
    } else {
      this.workoutApi.updateAttributes(model.id, model).subscribe(
        record => {
          this.router.navigate(['/workouts']);
          this._notifications.info('Workout Update.');
        },
        error => {
          this._notifications.warn('Ooops!');
        }
      );
    }
  }
}