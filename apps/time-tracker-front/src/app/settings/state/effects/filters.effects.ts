import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FilterActions } from '../actions';
import { catchError, EMPTY, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs';
import { Filter } from '@time-tracker/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsSevice } from '../../services/settings.service';
import { Store } from '@ngrx/store';
import { selectFiltersState } from '../../state/selectors';

@Injectable()
export class FiltersEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private settingsService: SettingsSevice,
    private _snackBar: MatSnackBar,
  ) {}

  loadFilters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FilterActions.loadFilters),
      exhaustMap(() => {
        return this.settingsService.getFilters().pipe(
          map((filters: Filter[]) => {
            return FilterActions.loadFiltersSuccess({
              filters,
            });
          }),
          catchError((error) => {
            this._snackBar.open('Error loading Filters', 'Close', {
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

  saveFilters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[
        FilterActions.createFilter, 
        FilterActions.updateFilter, 
        FilterActions.deleteFilter
      ]),
      withLatestFrom(
        this.store.select(selectFiltersState)
      ),
      exhaustMap(([,filters]) => {
        return this.settingsService.saveFilters(filters).pipe(
          map(() => FilterActions.saveFiltersSuccess()),
          catchError((error) => {
            this._snackBar.open('Error Saving Filters', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
            return EMPTY;
          })
        )
      })
    )
  });
}
