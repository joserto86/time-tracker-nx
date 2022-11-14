import { createReducer, on } from '@ngrx/store';
import { DashboardState } from '@time-tracker/shared';
import { DashboardActions } from '../actions';

export const dashboardFeatureKey = 'dashboard';

export const initialState: DashboardState = {
  timeNotes: [],
  daysRange: [],
  loading: false,
  dateFilters: [],
  searchFilters: [],
};

export const reducer = createReducer(
  initialState,

  on(DashboardActions.loadTimeNotesSuccess, (state, response) => ({
    ...state,
    timeNotes: response.timeNotes,
    daysRange: response.daysRange,
    loading: false,
  })),

  on(DashboardActions.setDateFilters, (state, props) => ({
    ...state,
    dateFilters: props.filters,
  })),

  on(DashboardActions.setSearchFilters, (state, props) => ({
    ...state,
    searchFilters: props.filters,
  })),

  on(DashboardActions.removeDateFilters, (state) => ({
    ...state,
    dateFilters: [],
  })),

  on(DashboardActions.removeSearchFilters, (state) => ({
    ...state,
    searchFilters: [],
  })),

  on(DashboardActions.loadTimeNotes, (state) => ({
    ...state,
    loading: true,
  }))
);

export const getTimeNotes = (state: DashboardState) => state.timeNotes;
export const getTimeNotesLoading = (state: DashboardState) => state.loading;
export const getDaysRange = (state: DashboardState) => state.daysRange;
export const getSearchFilters = (state: DashboardState) => state.searchFilters;
export const getDateFilters = (state: DashboardState) => state.dateFilters;
export const getFilters = (state: DashboardState) => [
  ...state.dateFilters,
  ...state.searchFilters,
];
