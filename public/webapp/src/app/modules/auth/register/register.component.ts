import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {DataService} from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import {Account} from '../../../apiclient/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: Account;
  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      wrappers: ['field'],
      templateOptions: {
        label: 'First Name',
        placeholder: 'First Name',
        required: true,
        icon: 'ft-user'
      }
    },
    {
      key: 'lastName',
      type: 'input',
      wrappers: ['field'],
      templateOptions: {
        label: 'Last Name',
        placeholder: 'Last Name',
        required: true,
        icon: 'ft-user'
      }
    },
    {
      key: 'email',
      type: 'input',
      wrappers: ['field'],
      templateOptions: {
        label: 'Email',
        placeholder: 'Email',
        required: true,
        icon: 'ft-mail'
      }
    },
    {
      key: 'password',
      type: 'input',
      wrappers: ['field'],
      templateOptions: {
        label: 'Password',
        placeholder: 'Password',
        required: true,
        type: 'password',
        icon: 'ft-unlock',
      }
    }
  ];

  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    this.model = {} as Account;
  }

  ngOnInit() {}

  register() {
    const credentials = Object.assign({}, this.model);
    delete credentials.firstName;
    delete credentials.lastName;

    this.dataService.createAccount(this.model)
      .then(response => {
        console.log(response);
        if (response.data.email) {
          this.login(credentials);
        } else {
          Swal.fire(
            'Error',
            response.data.message,
            'warning'
          );
        }

      })
      .catch(error => {

        Swal.fire(
          (error.response.data.error.details[0].path) ? error.response.data.error.details[0].path
            : error.response.data.error.details[0].info.missingProperty,
          error.response.data.error.details[0].message,
          'warning'
        );
      });
  }

  login(creds) {
    this.dataService.logIn(creds)
      .then(response => {
        localStorage.setItem('accountData', JSON.stringify(response.data));
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log(error.response);
      });
  }

}
