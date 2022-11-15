import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InstancesActions } from '../actions';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { InstancesService } from '../../services/instances.service';
import { Instance } from '@time-tracker/shared';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class InstancesEffects {
  constructor(
    private actions$: Actions,
    private instancesService: InstancesService,
    private _snackBar: MatSnackBar,
  ) {}

  loadInstances$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InstancesActions.loadInstances),
      exhaustMap(() => {
        return this.instancesService.getInstances().pipe(
          map((instances: Instance[]) => {
            return InstancesActions.loadInstancesOk({
              instances,
            });
          }),
          catchError((error) => {
            this._snackBar.open('Error loading instances', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
            return EMPTY;
          })
        );
      })
    );
  });

  saveInstanceToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InstancesActions.saveInstanceToken),
      exhaustMap((props) => {
        return this.instancesService.saveInstanceToken(props.token).pipe(
          map(() =>
            InstancesActions.saveInstanceTokenOk({ id: props.token.id })
          ),
          catchError((error) => {
            console.log({ error });

            this._snackBar.open(`Error saving token`, 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
            return EMPTY;
          })
        );
      })
    );
  });
}
