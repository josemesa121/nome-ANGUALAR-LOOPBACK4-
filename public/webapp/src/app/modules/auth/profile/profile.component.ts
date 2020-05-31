import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { LoopBackAuth } from '../../../apiclient/services/';
import { Account } from '../../../apiclient/models';
import { AccountApi } from '../../../apiclient/services/custom/';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: Partial<Account>;
  isNewRecord: boolean;
  info: any[];

  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        label: 'First Name',
        placeholder: 'First Name',
        required: true,
      }
    },
    {
      key: 'lastName',
      type: 'input',
      templateOptions: {
        label: 'Last Name',
        placeholder: 'Last Name',
        required: true,
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        placeholder: 'Email',
        required: true,
      }
    }
  ];

  constructor(
    private _notifications: NotificationsService,
    private loopBackAuth: LoopBackAuth,
    private router: Router,
    private route: ActivatedRoute,
    private accountApi: AccountApi) { }

  ngOnInit() {
    this.getModel();
  }

  getModel() {
    this.accountApi.findById(this.loopBackAuth.getCurrentUserId()).subscribe(
      data => {
        this.model = data;
      },
      err => { }
    );
  }

  save(model) {
    this.accountApi.patchAttributes(model.id, model).subscribe(
      record => {
        this.router.navigate(['/profile']);
        this._notifications.success('Profile Update.');
      },
      error => {
        this._notifications.warn('Ooops!');
      }
    );
  }
}