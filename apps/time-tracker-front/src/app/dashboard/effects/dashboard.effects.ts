import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { DashboardActions } from '../actions';
import { DashbordService } from '../services/dashboard.service';

@Injectable()
export class DashboardEffects {
  loadInstances$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadInstances),
      exhaustMap(() =>
        this.dashboardService.instances().pipe(
          map((response: unknown) => {
            return DashboardActions.loadInstancesSuccess({ instances: response });
          }),
          catchError((error) => of(error))
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
