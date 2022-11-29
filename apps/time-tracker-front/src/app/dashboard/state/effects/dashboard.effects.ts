import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, EMPTY, mergeMap, withLatestFrom, switchMap } from 'rxjs';
import { DashboardActions } from '../actions';
import * as fromDashboard from '../selectors/';
import { DashbordService } from '../../services/dashboard.service';
import { TimeNote } from '@time-tracker/shared';
import { DatesService } from '../../../shared/services/dates.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class DashboardEffects {

  loadTimeNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadTimeNotes),
      withLatestFrom(
          this.store.select(fromDashboard.selectDateFilters),
          this.store.select(fromDashboard.selectSearchFilters),
          this.store.select(fromDashboard.selectIsAdvancedSearch),
      ),
      switchMap(([,dateFilters, searchFilters, isAdvancedSearch]) =>
        this.dashboardService.timeNotes(dateFilters, searchFilters, isAdvancedSearch).pipe(
          map((response: TimeNote[]) => {
            return DashboardActions.loadTimeNotesSuccess({
              timeNotes: response,
              daysRange: this.datesService.getDaysRangeFromFilters(dateFilters)
            });
          }),
          catchError((error) => {
            console.log('failure dashboard');
            console.log(error);

            this._snackBar.open('Error Loading Data', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
            DashboardActions.loadTimeNotesFailure();
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
    private datesService: DatesService,
    private _snackBar: MatSnackBar,
  ) {}
}
