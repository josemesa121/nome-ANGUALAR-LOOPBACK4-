import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { LoopBackAuth } from '../../../apiclient/services';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Workout } from '../../../apiclient/models';
import { AccountApi, WorkoutApi } from '../../../apiclient/services/custom/';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.css']
})
export class WorkoutsListComponent implements OnInit {

  workouts: Partial<Workout>[];
  count: number = 0;
  isNewRecord: boolean = false;
  addData: boolean;

  model: Partial<Workout>;
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
    private accountApi: AccountApi,
    private workoutApi: WorkoutApi) { 
      this.addData = false;
      this.model = {} as Workout;
    }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.accountApi.getWorkouts(this.loopBackAuth.getCurrentUserId()).subscribe(
      data => {
        this.workouts = data;
      }
    );
  }

  deleteItem(model) {
    this.workoutApi.deleteSets(model.id).subscribe(
      ok => {
        this.workoutApi.deleteById(model.id).subscribe(
          ok => {
            this.getData();
            this._notifications.error('Workout deleted.');
          },
          error => {
          }
        );
      }
    );
  }

  showForm() {
    this.addData = !this.addData;
    this.isNewRecord = true;
  }

  editItem(model) {
    this.model = model
    this.isNewRecord = false;
    this.addData = !this.addData;
  }

  save(model) {
    if (this.isNewRecord) {
      model.accountId = this.loopBackAuth.getCurrentUserId();

      this.workoutApi.create(model).subscribe(
        record => {
          /* this.getData();
          this.addData = false; */
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
          this.getData();
          this.addData = false;
          this._notifications.info('Workout Update.');
        },
        error => {
          this._notifications.warn('Ooops!');
        }
      );
    }
  }
}