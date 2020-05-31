import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
  }

}
