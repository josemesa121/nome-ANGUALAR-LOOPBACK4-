import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {DataService} from './data.service';
@Injectable()
export class Auth implements CanActivate {

    constructor(
        private router: Router,
        private dataService: DataService
    ) {}

    canActivate(): Promise<boolean> | boolean {
        if (this.dataService.verifyToken()) {
            return true;
        }

        this.router.navigate(['/auth/login']);
        return false;
    }
}
