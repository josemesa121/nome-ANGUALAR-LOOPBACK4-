import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from 'src/app/services/data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  accountData: any;

  constructor(
    private dataService: DataService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.accountData = this.dataService.getAccountData();
  }

  logout() {
    this.dataService.logOut();
    this.router.navigate(['/auth/login']);
  }

}
