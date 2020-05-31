import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nPluralPipe } from '@angular/common';

import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { Workout } from '../../../apiclient/models';
import { WorkoutApi } from '../../../apiclient/services/custom';

@Component({
  selector: 'app-view',
  templateUrl: './workouts-view.component.html',
  styleUrls: ['./workouts-view.component.css']
})
export class WorkoutsViewComponent implements OnInit {

  id: number;
  workout: Partial<Workout>;
  addData: boolean;
  isNewRecord: boolean = false;
  form = new FormGroup({});
  model = { sets: [] };
  countSet: any;
  options: FormlyFormOptions = {};

  itemPluralMapping = {
    '=0': '0 Items',
    '=1': '1 Item',
    'other': '# Items'
  };

  fields: FormlyFieldConfig[] = [
    {
      key: 'sets',
      type: 'repeat',
      fieldArray: {
        fieldGroupClassName: 'row',
        templateOptions: {
          btnText: 'Add row',
        },
        fieldGroup: [
          {
            className: 'col-sm-2',
            type: 'input',
            key: 'name',
            templateOptions: {
              label: 'Name:',
              required: true,
            },
          },
          {
            className: 'col-sm-2',
            type: 'input',
            key: 'reps',
            templateOptions: {
              label: 'Reps:',
              required: true,
            },
          },
          {
            type: 'input',
            key: 'distance',
            className: 'col-sm-3',
            templateOptions: {
              required: true,
              label: 'Distance:',
            },
          },
          {
            type: 'input',
            key: 'pace',
            className: 'col-sm-3',
            templateOptions: {
              required: true,
              label: 'Pace:'
            },
          },
          {
            type: 'input',
            key: 'rest',
            className: 'col-sm-3',
            templateOptions: {
              label: 'Rest',
              required: true
            },
          },
          {
            type: 'input',
            key: 'big_rest',
            className: 'col-sm-3',
            templateOptions: {
              label: 'Rest',
              required: true
            },
          }
        ],
      },
    },
  ];

  constructor(
    private _notifications: NotificationsService,
    private route: ActivatedRoute,
    private workoutApi: WorkoutApi
  ) {
    this.workout = {} as Workout;
    this.addData = false;
  }

  ngOnInit() {
    this.getData();
  }

  showForm() {
    this.addData = !this.addData;
    this.isNewRecord = true;
    this.model.sets = [{}];
  }

  getData() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.workoutApi.countSets(this.id).subscribe(
          data => {
            this.countSet = data.count;
          }
        );
        this.workoutApi.findById(this.id, { include: 'sets' }).subscribe(
          data => {
            this.workout = data;
          }
        );
      }
    });
  }

  deleteItem(model) {
    this.workoutApi.destroyByIdSets(this.workout.id, model.id).subscribe(
      ok => {
        this.getData();
        this._notifications.error('Set deleted.');
      },
      error => {
      }
    );
  }

  editItem(model) {
    this.model = { sets: [] };
    this.model.sets.push(model);
    this.isNewRecord = false;
    this.addData = !this.addData;
  }

  save(model) {
    if (this.isNewRecord) {
      model.sets.forEach(set => {
        this.createData(this.workout.id, set);
      });
    } else {
      model.sets.forEach(set => {
        if (set.id) {
          this.updateData(this.workout.id, set.id, set);
        } else {
          this.createData(this.workout.id, set);
        }
      });
    }
  }

  createData(id, set) {
    this.workoutApi.createSets(id, set).subscribe(
      setData => {
        this.getData();
        this.addData = false;
        // this.model = {sets: []};
        this._notifications.info('Sets created.');
      },
      errorData => {
        this._notifications.warn('Ooops!');
      }
    );

  }
  updateData(id, fk, set) {
    this.workoutApi.updateByIdSets(id, fk, set).subscribe(
      setData => {
        this.getData();
        this.addData = false;
        // this.model = {sets: []};
        this._notifications.info('Sets updated.');
      },
      errorData => {
        this._notifications.warn('Ooops!');
      }
    );
  }
}