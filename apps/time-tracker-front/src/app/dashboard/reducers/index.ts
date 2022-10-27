import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromDashboard from './dashboard.reducer';

export const dashboardFeatureKey = 'dashboard';
export const statusFeatureKey = fromDashboard.dashboardFeatureKey;
export interface DashboardState {
  [fromDashboard.dashboardFeatureKey]: fromDashboard.State;
}

export interface State {
  [dashboardFeatureKey]: DashboardState;
}

export function reducers(state: DashboardState | undefined, action: Action) {
  return combineReducers({
    [fromDashboard.dashboardFeatureKey]: fromDashboard.reducer,
  })(state, action);
}

export const selectDashState =
  createFeatureSelector<DashboardState>(dashboardFeatureKey);
export const selectDashboardState = createSelector(
  selectDashState,
  (state) => state[dashboardFeatureKey]
);

export const selectInstances = createSelector(
  selectDashboardState,
  fromDashboard.getInstances
);

export const selectInstancesLoading = createSelector(
  selectDashboardState,
  fromDashboard.getInstancesLoading
);
