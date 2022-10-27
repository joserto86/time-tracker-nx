import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  BehaviorSubject,
  catchError,
  filter, switchMap, throwError,
  timeout
} from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { AuthActions } from '../actions';
import * as fromAuth from '../reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private tokenStore = new BehaviorSubject<string>('');

  constructor(private api: ApiService, private store: Store) {
    this.store
      .pipe(
        select(fromAuth.selectCurrentAuthorizationToken),
        filter((s): s is string => s != null)
      )
      .subscribe(this.tokenStore);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    if (this.api.needsAuthToken(request)) {
      return next.handle(this.addAuthHeader(request)).pipe(
        catchError((error) => {
          if (error?.status === 401) {
            this.tokenStore.next('');
            this.store.dispatch(AuthActions.refreshToken());

            return this.tokenStore.asObservable()
              .pipe(
                filter(
                  (newAuthToken): newAuthToken is string => !!newAuthToken
                ),
                timeout(10000),
                switchMap(() =>
                  next.handle(this.addAuthHeader(request))
                )
              );
          } else {
            return throwError(() => error);
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }

  addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
    const authToken = this.tokenStore.value;

    const headers = authToken
      ? request.headers.set('Authorization', authToken)
      : undefined;

    return request.clone({ headers });
  }
}
