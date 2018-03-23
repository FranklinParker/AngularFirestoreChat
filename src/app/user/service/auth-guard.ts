import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { take } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));

  }
}
