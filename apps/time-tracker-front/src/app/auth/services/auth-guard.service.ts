import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthApiActions } from '../actions';
import * as fromAuth from '../reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(fromAuth.selectLoggedIn).pipe(
      map(({ loggedIn }) => {
        if (!loggedIn) {
          this.store.dispatch(AuthApiActions.loginRedirect());
          return false;
        } else {
          return true;
        }
      }),
      take(1)
    );
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.store.select(fromAuth.selectLoggedIn).pipe(
      map(({ loggedIn }) => {
        if (!loggedIn) {
          this.store.dispatch(AuthApiActions.loginRedirect());
          return false;
        } else {
          return true;
        }
      }),
      take(1)
    );
  }
}
