import {Component, Input, OnInit} from '@angular/core';
import {WorkoutApi} from 'src/app/apiclient';
import {DataService} from 'src/app/services/data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-workout-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class WorkoutListItemComponent implements OnInit {

  @Input() workout;
  isDeleted = false;

  constructor(
    private workoutApi: WorkoutApi,
    private dataService: DataService
  ) {}

  ngOnInit() {}

  delete(model) {

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

        this.dataService.deleteWorkoutSets(model)
          .then(response => {

            this.dataService.deleteWorkout(model)
              .then(response2 => {
                this.isDeleted = true;

                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                );
              })
              .catch(error => {
                Swal.fire(
                  'Opps!!',
                  'Lo sentimos, se presento un error, intenta de nuevo.',
                  'error'
                );
              });


          }).catch(error => {
            Swal.fire(
              'Opps!!',
              'Lo sentimos, se presento un error, intenta de nuevo.',
              'error'
            );
          });
      }
    });
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

}
