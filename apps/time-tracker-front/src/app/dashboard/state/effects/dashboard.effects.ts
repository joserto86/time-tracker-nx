import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, EMPTY } from 'rxjs';
import { DashboardActions } from '../actions';
import { DashbordService } from '../../services/dashboard.service';
import { TimeNote } from '@time-tracker/shared';

@Injectable()
export class DashboardEffects {
  loadTimeNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadTimeNotes),
      exhaustMap(({filters}) =>
        this.dashboardService.timeNotes(filters).pipe(
          map((response: TimeNote[]) => {
            return DashboardActions.loadTimeNotesSuccess({ timeNotes: response });
          }),
          catchError((error) => {
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private dashboardService: DashbordService,
    private router: Router // private dialog: MatDialog
  ) {}
}
