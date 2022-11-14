import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { DashboardState } from '@time-tracker/shared';
import * as fromDashboard from '../reducers/dashboard.reducer';

export const selectDashboardState =createFeatureSelector<DashboardState>(
  fromDashboard.dashboardFeatureKey
);


export const selectTimeNotes = createSelector(
  selectDashboardState,
  fromDashboard.getTimeNotes
);

export const selectTimeNotesLoading = createSelector(
  selectDashboardState,
  fromDashboard.getTimeNotesLoading
);

export const selectDaysRange = createSelector(
  selectDashboardState,
  fromDashboard.getDaysRange
);

export const selectFilters = createSelector (
  selectDashboardState,
 fromDashboard.getFilters
)