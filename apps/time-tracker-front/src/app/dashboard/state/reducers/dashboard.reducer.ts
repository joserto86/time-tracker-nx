import { createReducer, on } from '@ngrx/store';
import { DashboardState } from '@time-tracker/shared';
import { DashboardActions } from '../actions';
import { setCalendar } from '../actions/dashboard-actions';

export const dashboardFeatureKey = 'dashboard';

export const initialState: DashboardState = {
  calendar: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  },
  timeNotes: [],
  daysRange: [],
  loading: false,
  advancedSearch: false,
  dateFilters: [],
  searchFilters: [],
  showPaginator: true,
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
  })),

  on(DashboardActions.setShowPaginator, (state, props) => ({
    ...state,
    showPaginator: props.showPaginator,
  })),

  on(DashboardActions.setAdvancedSearch, (state, props) => ({
    ...state,
    advancedSearch: props.advanced,
  })),

  on(DashboardActions.setCalendar, (state, props) => ({
    ...state,
    calendar: props,
  })),

  on(DashboardActions.loadTimeNotesFailure, (state) => ({
    ...state,
    loading: false
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

export const getIsAdvancedSearch = (state: DashboardState) =>
  state.advancedSearch;
export const getShowPaginator = (state: DashboardState) => state.showPaginator;
export const getCalendar = (state: DashboardState) => state.calendar;
