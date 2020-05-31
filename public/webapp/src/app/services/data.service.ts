import {Injectable} from '@angular/core';
import axios from 'axios';
import * as moment from 'moment';
const axiosClient = axios.create();
@Injectable({
  providedIn: 'root'
})
export class DataService {

  accountData: any = {};

  constructor() {}

  createAccount(data) {
    return axiosClient({
      method: 'post',
      url: 'http://localhost:3000/accounts',
      data: data
    });
  }

  logIn(data) {
    return axiosClient({
      method: 'post',
      url: 'http://localhost:3000/accounts/login',
      data: data
    });
  }

  getToken() {
    if (localStorage.getItem('accountData')) {
      const accountData = JSON.parse(localStorage.getItem('accountData'));
      return accountData.token;
    }
  }

  getAccountData() {
    return JSON.parse(localStorage.getItem('accountData'));
  }

  logOut() {
    this.accountData = {};
    localStorage.removeItem('accountData');
  }

  // verifyToken() {
  //   return axiosClient({
  //     method: 'post',
  //     url: 'http://localhost:3000/accounts/verifyAuth',
  //     data: {
  //       token: this.getToken()
  //     }
  //   });
  // }

  verifyToken() {
    if (this.getToken()) {
      const token = this.getToken();
      this.accountData = JSON.parse(atob(token.split('.')[1]));

      const currentDate = moment();
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = moment.unix(payload.exp);
      if (moment(currentDate).isSameOrAfter(expirationDate)) {
        this.logOut();
        // return {verifyAuth: false, message: 'Error verifying token: jwt expired'};
        return false;
      } else {
        // return {verifyAuth: true, message: 'token verifying: jwt valid'};
        return true;
      }

    } else {
      // return {verifyAuth: false, message: 'Error verifying token: jwt not found'};
      return false;
    }
  }


  // {
  //   include: [{relation: 'sets'}],
  //   where: {accountId: userId},
  // }
  getMyWorkouts() {
    const filter = '?filter[include][][relation]=sets' + '&filter[where][accountId]=' + this.accountData.id;

    return axiosClient({
      method: 'get',
      url: 'http://localhost:3000/workouts' + filter,
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  }


  getWorkout(data) {
    const filter = '?filter[include][][relation]=sets';

    return axiosClient({
      method: 'get',
      url: 'http://localhost:3000/workouts/' + data.id + filter,
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  }

  createWorkout(data) {
    return axiosClient({
      method: 'post',
      url: 'http://localhost:3000/workouts',
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      },
      data: data
    });
  }

  updateWorkout(data) {
    return axiosClient({
      method: 'patch',
      url: 'http://localhost:3000/workouts/' + data.id,
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      },
      data: data
    });
  }

  deleteWorkout(data) {
    return axiosClient({
      method: 'delete',
      url: 'http://localhost:3000/workouts/' + data.id,
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      },
    });
  }

  deleteWorkoutSets(data) {
    return axiosClient({
      method: 'delete',
      url: 'http://localhost:3000/workouts/' + data.id + '/setts',
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      },
    });
  }

  createSet(data) {
    return axiosClient({
      method: 'post',
      url: 'http://localhost:3000/sets/',
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      },
      data: data
    });
  }

  updateSet(data) {
    return axiosClient({
      method: 'patch',
      url: 'http://localhost:3000/sets/' + data.id,
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      },
      data: data
    });
  }

  deleteSet(data) {
    return axiosClient({
      method: 'delete',
      url: 'http://localhost:3000/sets/' + data.id,
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      },
    });
  }
}
