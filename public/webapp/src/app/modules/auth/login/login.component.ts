import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {DataService} from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import {Account} from '../../../apiclient/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  @Output() title = new EventEmitter<String>();

  model: Account;
  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      wrappers: ['field'],
      templateOptions: {
        placeholder: 'Email',
        required: true,
        icon: 'ft-user',
      }
    },
    {
      key: 'password',
      type: 'input',
      wrappers: ['field'],
      templateOptions: {
        type: 'password',
        placeholder: 'Password',
        required: true,
        icon: 'ft-unlock',
      }
    },
  ];

  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    this.title.emit('Login with Nome');
  }

  ngOnInit() {
    this.model = {} as Account;
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    if (this.dataService.verifyToken()) {
      this.router.navigate(['/']);
    }
  }

  login(creds) {
    this.dataService.logIn(creds)
      .then(response => {
        console.log(response);
        localStorage.setItem('accountData', JSON.stringify(response.data));
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log(error.response);
        Swal.fire(
          'Error',
          'Email or password invalid.',
          'warning'
        );
      });
  }

}
