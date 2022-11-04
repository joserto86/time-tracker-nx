// import { JwtResponse, PublicUser } from '@time-tracker/shared';
import { createReducer, on } from '@ngrx/store';
import { DashboardState, TimeNote } from '@time-tracker/shared';
import { DashboardActions } from '../actions';

export const dashboardFeatureKey = 'dashboard';

export const initialState: DashboardState = {
  timeNotes: [],
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(DashboardActions.loadTimeNotesSuccess, (state, response) => ({
    ...state,
    timeNotes: response.timeNotes,
    loading: false,
  })),

  on(DashboardActions.loadTimeNotes, (state) => ({
    ...state,
    loading: true,
  }))
);

export const getTimeNotes = (state: DashboardState) => state.timeNotes;
export const getTimeNotesLoading = (state: DashboardState) => state.loading;