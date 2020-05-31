import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {NotificationsService} from 'angular2-notifications';
import {AccountApi, LoopBackAuth, Set, SetApi, Workout, WorkoutApi} from 'src/app/apiclient';
import {DataService} from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-workout-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class WorkoutManageComponent implements OnInit {


  accountData: any = {};

  model: Partial<Workout>;
  isNewRecord: boolean;
  info: any[];
  form = new FormGroup({});
  formSets = new FormGroup({});
  wSets = {
    sets: [{}]
  };


  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Workout Date:',
            placeholder: 'Workout Date',
            type: 'date',
            pattern: '/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/',
            required: true,
          },
        },
        {
          className: 'col-6',
          key: 'swimmers',
          type: 'select',
          defaultValue: 1,
          templateOptions: {
            label: '# of Swimmers',
            options: [
              {label: '1', value: 1},
              {label: '2', value: 2},
              {label: '3', value: 3},
              {label: '4', value: 4},
              {label: '5', value: 5},
            ],

          },
        },
      ],
    }
  ];
  id: number;
  countSet: any;
  workout: unknown;
  swing = [];
  select;
  varselect: any;
  defvar: any;
  swim: number[];

  constructor(
    private notifications: NotificationsService,
    private loopBackAuth: LoopBackAuth,
    private router: Router,
    private route: ActivatedRoute,
    private accountApi: AccountApi,
    private workoutApi: WorkoutApi,
    private setsApi: SetApi,
    private dataService: DataService

  ) {
    this.accountData = this.dataService.getAccountData();
    this.model = {} as Workout;
    this.isNewRecord = true;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.model.sets = [];
    this.addSet();
    this.route.params.subscribe(params => {
      this.id = +params.id;
      if (this.id) {

        this.dataService.getWorkout({id: this.id})
          .then(response => {
            console.log(response);
            this.countSet = response.data.sets.length;
            this.model = response.data;
            delete this.model.modified_at;
            this.isNewRecord = false;

          })
          .catch(error => {
            console.log(error.response);
          });
      }
    });

  }


  save(model) {
    const requestBody = Object.assign({}, model);
    delete requestBody.sets;
    requestBody.accountId = this.dataService.accountData.id;
    if (this.isNewRecord) {

      this.dataService.createWorkout(requestBody)
        .then(response => {
          this.model.id = response.data.id;
          this.isNewRecord = false;
          this.saveSets();
          Swal.fire(
            'Success',
            'operation executed.',
            'success'
          );
          this.router.navigate(['/workouts/edit', response.data.id]);

        })
        .catch(error => {
          console.log(error.response);
          Swal.fire(
            'Opps!!',
            'Lo sentimos, hubo un error, intenta de nuevo.',
            'error'
          );
        });


    } else {

      this.dataService.updateWorkout(requestBody)
        .then(response => {
          this.saveSets();
          Swal.fire(
            'Success',
            'operation executed.',
            'success'
          );
          this.router.navigate(['/workouts']);

        })
        .catch(error => {
          console.log(error.response);
          Swal.fire(
            'Opps!!',
            'Lo sentimos, hubo un error, intenta de nuevo.',
            'error'
          );
        });
    }
  }


  parseSetNumeric(set) {

    if (set.name == null) {
      delete set.name;
    }
    if (set.order == null) {
      delete set.order;
    }
    if (set.tbs == null) {
      delete set.tbs;
    }

    set.big_rest = Number(set.big_rest);
    set.distance = Number(set.distance);
    set.invterval = Number(set.invterval);
    set.pace1 = Number(set.pace1);
    set.pace2 = Number(set.pace2);
    set.pace3 = Number(set.pace3);
    set.pace4 = Number(set.pace4);
    set.pace5 = Number(set.pace5);
    set.reps = Number(set.reps);
    set.rest = Number(set.rest);
    if (set.tbs) {
      set.tbs = Number(set.tbs);
    }
    if (set.order) {
      set.order = Number(set.order);
    }

    return set;
  }

  saveSets() {
    this.model.sets.forEach(wSet => {
      wSet = this.parseSetNumeric(wSet);
      wSet.workoutId = this.model.id;

      if (wSet.id) {
        this.updateData(wSet);

      } else {
        this.createData(wSet);

      }
    });
  }

  createData(set) {
    this.dataService.createSet(set)
      .then(response => {
        // save set
      })
      .catch(error => {
        console.log(error.response);
      });
  }


  updateData(set) {
    this.dataService.updateSet(set)
      .then(response => {
        // update set
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  addSet() {
    const newSet = {
      pace1: 0,
      pace2: 0,
      pace3: 0,
      pace4: 0,
      pace5: 0,
      rest: 0,
      invterval: 0,
      big_rest: 0,
    } as Set;
    this.model.sets.push(newSet);
  }

}
