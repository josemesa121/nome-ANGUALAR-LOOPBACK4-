import axios from 'axios';
import {environment} from '../environments/environment';
const axiosClient = axios.create();
const qs = require('querystring');

export class AxiosService {
  constructor() {}

  createCustomer(data: any) {
    return axiosClient({
      method: 'post',
      url: environment.serverUrl + 'products/nome-dev-11160/customers',
      headers: {
        Authorization: 'Basic bm9tZS1kZXYtY2xpZW50LTkwMzg6ODJhYjA0YTBlNzAxZTBlOTNmMzhlMGI2MzYwYWFjMmU5YjY0NWM3Ng==',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(data)
    });
  }


}
