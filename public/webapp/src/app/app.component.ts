import { Component } from '@angular/core';
import { LoopBackConfig } from './apiclient';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webapp';
  constructor(){
    LoopBackConfig.setBaseURL(environment.apiUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }
}
