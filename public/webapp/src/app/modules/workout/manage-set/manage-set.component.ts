import {AfterViewInit, Component, Host, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LabelType} from 'ng5-slider';
import {AccountApi, LoopBackAuth, Workout, WorkoutApi} from 'src/app/apiclient';
import {DataService} from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import {WorkoutManageComponent} from '../manage/manage.component';
@Component({
  selector: 'app-workout-manage-set',
  templateUrl: './manage-set.component.html',
  styleUrls: ['./manage-set.component.scss']
})
export class WorkoutManageSetComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() wSet;
  @Input() forma: FormGroup;
  _Notifications: any;
  model: Partial<Workout>;
  workouts: Partial<Workout>[];
  editName: boolean;
  auxPAce = '';
  auxPAce2 = '';
  auxPAce3 = '';
  auxPAce4 = '';
  auxPAce5 = '';
  auxpacenum = 0;
  auxRest = '';
  auxBigRest = '';
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  newdata = '';
  valuec1: any;
  tempo = 0;
  tbs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  pru: WorkoutManageComponent;
  date = new Date();
  auxinterval = '';

  constructor(
    private formBuilder: FormBuilder,
    private loopBackAuth: LoopBackAuth,
    private router: Router,
    private accountApi: AccountApi,
    private workoutApi: WorkoutApi,
    @Host() public _D: WorkoutManageComponent,
    private fb: FormBuilder,
    private dataService: DataService,
    private workoutManageComponent: WorkoutManageComponent

  ) {
    this.model = {} as Workout;
    // this.setformvalidator();

    // this.forma = new FormGroup({
    //      name : new FormControl('', [Validators.required, Validators.minLength(3)]),
    //      reps : new FormControl('', [Validators.required, Validators.minLength(3)]),
    //      distance : new FormControl('', [Validators.required, Validators.minLength(3)]),
    //      pace : new FormControl('', [Validators.required]),
    //      pace2 : new FormControl('', [Validators.required]),
    //      pace3 : new FormControl('', [Validators.required]),
    //      pace4 : new FormControl('', [Validators.required]),
    //      pace5 : new FormControl('', [Validators.required]),
    //      rest : new FormControl('', [Validators.required]),
    //      big_rest : new FormControl('', [Validators.required]),
    //      interval : new FormControl('', [Validators.required]),
    //      tbs : new FormControl('', [Validators.required]),
    // });
  }
  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      reps: new FormControl('', [Validators.required, Validators.minLength(3)]),
      distance: new FormControl('', [Validators.required, Validators.minLength(3)]),
      pace: new FormControl('', [Validators.required]),
      pace2: new FormControl('', [Validators.required]),
      pace3: new FormControl('', [Validators.required]),
      pace4: new FormControl('', [Validators.required]),
      pace5: new FormControl('', [Validators.required]),
      rest: new FormControl('', [Validators.required]),
      big_rest: new FormControl('', [Validators.required]),
      interval: new FormControl('', [Validators.required]),
      tbs: new FormControl('', [Validators.required]),
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes.wSet);
    this.auxPAce = this.secsToTime(this.wSet.pace1);
    this.auxPAce2 = this.secsToTime(this.wSet.pace2);
    this.auxPAce3 = this.secsToTime(this.wSet.pace3);
    this.auxPAce4 = this.secsToTime(this.wSet.pace4);
    this.auxPAce5 = this.secsToTime(this.wSet.pace5);
    this.auxRest = this.secsToTime(this.wSet.rest);
    this.auxBigRest = this.secsToTime(this.wSet.big_rest);
    this.auxinterval = this.secsToTime(this.wSet.invterval);
  }
  ngAfterViewInit(): void {
    // this.getData();
    console.log('prueba');
    // throw new Error('Method not implemented.');
  }

  secsToTime(secs) {
    const seconds = parseInt(secs, 10);

    const minutes = Math.floor(seconds / 60);
    let minutesString = '00';
    if (minutes < 10) {
      minutesString = '0' + minutes.toString();
    } else {
      minutesString = minutes.toString();
    }

    const finalseconds = Math.floor(seconds % 60);
    let secondsString = '00';

    if (finalseconds < 10) {
      secondsString = '0' + finalseconds.toString();
    } else {
      secondsString = finalseconds.toString();
    }

    return minutesString + ':' + secondsString;
  }
  segundos(newTIme) {
    console.log('entro');
    this.newdata = '';
    this.newdata = newTIme.toString();
    const minutes = this.newdata.substring(0, 2);
    const seconds = this.newdata.substring(2, 4);
    let minutesString = '00';
    if (parseInt(minutes, 10) < 10) {
      minutesString = minutes.toString();
      const minute = parseInt(minutesString, 10) * 60;
      const finalseconds = Math.floor(parseInt(seconds, 10) % 60);
      this.tempo = minute + finalseconds;
      console.log(this.tempo);
    } else {
      minutesString = minutes.toString();
      const minute = parseInt(minutesString, 10) * 60;
      const finalseconds = Math.floor(parseInt(seconds, 10) % 60);
      this.tempo = minute + finalseconds;
      console.log(this.tempo);
    }
    newTIme = this.tempo.toString();
    console.log(newTIme);
    return newTIme;

  }
  saveseconds(d, value: string) {
    if (value === 'auxPAce') {
      this.wSet.pace1 = this.segundos(d);
      console.log(this.wSet.pace1);
    }
    if (value === 'auxPAce2') {
      this.wSet.pace2 = this.segundos(d);
      console.log(this.wSet.pace2);
    }
    if (value === 'auxPAce3') {
      this.wSet.pace3 = this.segundos(d);
      console.log(this.wSet.pace3);
    }
    if (value === 'auxPAce4') {
      this.wSet.pace4 = this.segundos(d);
      console.log(this.wSet.pace4);
    }
    if (value === 'auxPAce5') {
      this.wSet.pace5 = this.segundos(d);
      console.log(this.wSet.pace5);
    }
    if (value === 'auxRest') {
      this.wSet.rest = this.segundos(d);
    }
    if (value === 'auxBigRest') {
      this.wSet.big_rest = this.segundos(d);
    }
    if (value === 'auxinterval') {
      this.wSet.invterval = this.segundos(d);
    }
  }
  formatSeconds(seconds: number, label: LabelType) {
    switch (label) {
      case LabelType.Low:
        const minutes = Math.floor(seconds / 60);
        let minutesString = '00';
        if (minutes < 10) {
          minutesString = '0' + minutes.toString();
        } else {
          minutesString = minutes.toString();
        }
        const finalseconds = Math.floor(seconds % 60);
        let secondsString = '00';

        if (finalseconds < 10) {
          secondsString = '0' + finalseconds.toString();
        } else {
          secondsString = finalseconds.toString();
        }

        return minutesString + ':' + secondsString;
      default:
        return '';
    }
  }


  deleteItem(model) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.dataService.deleteSet(model)
          .then((response) => {
            this.workoutManageComponent.getData();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );

          }).catch((error) => {
            this.workoutManageComponent.getData();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          });
      }
    });
  }


  getData() {
    throw new Error('Method not implemented.');
  }
}
