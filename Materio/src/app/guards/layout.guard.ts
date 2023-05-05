import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ABS_ACCOUNT_SIGNUP } from '../constant/absolute-routes';
import { StoreDataService } from '../services/store-data.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutGuard implements CanActivate {
  constructor(
    private _dataService: StoreDataService,
    private _router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._dataService.getUserInfo.userId) {
      console.log(this._dataService.getUserInfo.userId, 'userId');
      return true;
    }
    return this._router.navigate([ABS_ACCOUNT_SIGNUP]);
  }
}
