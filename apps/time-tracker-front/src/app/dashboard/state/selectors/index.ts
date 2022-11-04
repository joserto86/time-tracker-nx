import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { DashboardState } from '@time-tracker/shared';
import * as fromDashboard from '../reducers/dashboard.reducer';

// export const dashboardFeatureKey = 'dashboard';
// export const statusFeatureKey = fromDashboard.dashboardFeatureKey;
// export interface DashboardState {
//   [fromDashboard.dashboardFeatureKey]: fromDashboard.State;
// }

// export interface State {
//   [fromDashboard.dashboardFeatureKey]: fromDashboard.State;
// }

// export function reducers(state: State | undefined, action: Action) {
//   return combineReducers({
//     [fromDashboard.dashboardFeatureKey]: fromDashboard.reducer,
//   })(state, action);
// }

export const selectDashboardState =createFeatureSelector<DashboardState>(
  fromDashboard.dashboardFeatureKey
);

// export const selectDashboardState = createSelector(
//   selectDashState,
//   (state) => state[fromDashboard.dashboardFeatureKey]
// );

export const selectTimeNotes = createSelector(
  selectDashboardState,
  fromDashboard.getTimeNotes
);

export const selectTimeNotesLoading= createSelector(
  selectDashboardState,
  fromDashboard.getTimeNotesLoading
);
