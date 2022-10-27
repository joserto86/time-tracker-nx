// import { JwtResponse, PublicUser } from '@time-tracker/shared';
import { createReducer, on } from '@ngrx/store';
import { DashboardActions } from '../actions';

export const dashboardFeatureKey = 'dashboard';

export interface State {
  instances?: unknown;
  loading: boolean;
}

export const initialState: State = {
  instances: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(DashboardActions.loadInstancesSuccess, (state, response) => ({
    ...state,
    instances: response,
    loading: false,
  })),

  on(DashboardActions.loadInstances, (state) => ({
    ...state,
    loading: true,
  }))
);

export const getInstances = (state: State) => state.instances;
export const getInstancesLoading = (state: State) => state.loading;