import { Injectable } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtCredentials, JwtResponse } from '@time-tracker/shared';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  delay,
  exhaustMap,
  filter,
  ignoreElements,
  map,
  of,
  tap,
} from 'rxjs';
// import { LayoutActions } from '../../core/actions';
import { AuthActions, AuthApiActions, LoginPageActions } from '../actions';
// import { LogoutConfirmationDialogComponent } from '../components';
import * as fromAuth from '../reducers';
import { AuthService } from '../services';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      map((action) => action.credentials),
      exhaustMap((auth: JwtCredentials) =>
        this.authService.login(auth).pipe(
          map((jwt: JwtResponse) => {
            return AuthApiActions.loginSuccess({ jwt });
          }),
          catchError((error) => of(AuthApiActions.loginFailure({ error })))
        )
      )
    )
  );

  refresh$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      concatLatestFrom(() => this.store.select(fromAuth.selectJwtRefreshToken)),
      exhaustMap(([, refreshToken]) => {
        return this.authService.refresh(refreshToken || '').pipe(
          map((jwt) => AuthApiActions.setUser({ jwt })),
          catchError((error) => {
            console.log(error);
            return of(AuthActions.logout());
          })
        );
      })
    );
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.loginSuccess),
      map(({ jwt }) => AuthApiActions.setUser({ jwt })),
      tap(() => this.router.navigate(['/dashboard']))
    );
  });

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginRedirect, AuthActions.logout),
        tap(() => {
          console.log('redirect to login');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  //   logoutConfirmation$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.logoutConfirmation),
  //       exhaustMap(() => {
  //         const dialogRef = this.dialog.open<
  //           LogoutConfirmationDialogComponent,
  //           undefined,
  //           boolean
  //         >(LogoutConfirmationDialogComponent);

  //         return dialogRef.afterClosed();
  //       }),
  //       map((result) =>
  //         result ? AuthActions.logout() : AuthActions.logoutConfirmationDismiss()
  //       )
  //     )
  //   );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
        }),
        ignoreElements()
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) // private dialog: MatDialog
  {}
}
