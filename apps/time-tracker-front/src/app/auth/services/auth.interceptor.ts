import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, retryWhen, switchMap, take, throwError } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { AuthActions } from '../actions';
import * as fromAuth from '../reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private api: ApiService, private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    if (this.api.needsAuthToken(request)) {
      return this.store.pipe(
        select(fromAuth.selectCurrentAuthorizationToken),
        take(1),
        switchMap((authToken) => {
          if (authToken) {
            const headers = request.headers.set('Authorization', authToken);
            return next.handle(request.clone({ headers }));
          } else {
            return throwError(() => 'invalid token signature');
          }
        }),
        retryWhen((errors) => {
          return errors.pipe(
            switchMap((err) => {
              if (err.status === 401) {
                this.store.dispatch(AuthActions.refreshToken());
                return this.store.select(fromAuth.selectJwt).pipe(
                  filter((newJwt) => !!newJwt?.refresh_token),
                  take(1)
                );
              }

              return throwError(() => err);
            })
          );
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
