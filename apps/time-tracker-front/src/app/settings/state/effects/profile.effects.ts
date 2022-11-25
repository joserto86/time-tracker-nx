import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileActions } from '../actions';
import { catchError, EMPTY, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs';
import { Profile } from '@time-tracker/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsSevice } from '../../services/settings.service';
import { Store } from '@ngrx/store';
import { selectProfileState } from '../../state/selectors';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private settingsService: SettingsSevice,
    private _snackBar: MatSnackBar,
  ) {}

  loadProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.loadProfile),
      exhaustMap(() => {
        return this.settingsService.getProfile().pipe(
          map((profile: Profile) => {
            return ProfileActions.loadProfileSuccess({
              profile,
            });
          }),
          catchError((error) => {
            this._snackBar.open('Error loading Filters', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
            ProfileActions.loadProfileFailure();
            return EMPTY;
          })
        );
      })
    );
  });

  saveProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.saveProfile),
      withLatestFrom(
        this.store.select(selectProfileState)
      ),
      exhaustMap(([,profile]) => {
        return this.settingsService.saveProfile(profile).pipe(
          map(() => ProfileActions.saveProfileSuccess()),
          catchError((error) => {
            this._snackBar.open('Error Saving Profile', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
            ProfileActions.saveProfileFailure();
            return EMPTY;
          })
        )
      })
    )
  });
}
