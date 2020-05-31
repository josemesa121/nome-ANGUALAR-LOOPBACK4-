import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from 'src/app/services/data.service';
import {Workout} from '../../../apiclient/models';
import {LoopBackAuth} from '../../../apiclient/services';
import {AccountApi, WorkoutApi} from '../../../apiclient/services/custom/';



@Component({
  selector: 'app-workout-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class WorkoutDashboardComponent implements OnInit {

  workouts: Partial<Workout>[];

  constructor(
    private loopBackAuth: LoopBackAuth,
    private router: Router,
    private accountApi: AccountApi,
    private workoutApi: WorkoutApi,
    private dataService: DataService
  ) {}


  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getMyWorkouts()
      .then(response => {
        console.log(response);
        this.workouts = response.data;

      })
      .catch(error => {
        console.log(error.response);

      });
  }

}
