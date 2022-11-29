import { createReducer, on } from '@ngrx/store';
import { Columns, Filter, Instance, Profile } from '@time-tracker/shared';
import { saveDefaultColumns } from '../../../dashboard/state/actions/dashboard-actions';

import { FilterActions, InstancesActions, ProfileActions } from '../actions';

export const settingsFeaturedKey = 'settings';

export interface SettingsState {
  profile: Profile;
  filters: Filter[];
  instances: Instance[];
  loadingProfile: boolean;
  loadingFilters: boolean;
}

export const defaultColumns: Columns = {
  namespace: true,
  project: true,
  milestone: true,
  issue: true,
  labels: true,
};

export const initialState: SettingsState = {
  profile: {
    defaultView: 'monthly',
    defaultColumns,
  },
  filters: [],
  instances: [],
  loadingProfile: false,
  loadingFilters: false,
};

export const reducer = createReducer(
  initialState,

  on(ProfileActions.loadProfile, FilterActions.loadFilters, (state) => {
    return {
      ...state,
      loadingProfile: true,
    };
  }),
  on(ProfileActions.loadProfileSuccess, (state, props) => {
    return {
      ...state,
      profile: props.profile ?? initialState.profile,
      loadingProfile: false,
    };
  }),
  on(ProfileActions.saveProfile, (state, { profile }) => {
    return {
      ...state,
      profile,
      loadingProfile: true,
    };
  }),
  on(
    ProfileActions.saveProfileSuccess,
    ProfileActions.saveProfileFailure,
    ProfileActions.loadProfileFailure,
    (state) => {
      return {
        ...state,
        loadingProfile: false,
      };
    }
  ),
  on(
    FilterActions.saveFiltersSuccess,
    FilterActions.saveFiltersFailure,
    FilterActions.loadFiltersFailure,
    (state) => {
      return {
        ...state,
        loadingFilters: false,
      };
    }
  ),
  on(FilterActions.createFilter, (state, { filter }) => {
    return {
      ...state,
      filters: [...state.filters, filter],
      loadingFilters: true,
    };
  }),
  on(FilterActions.deleteFilter, (state, { id }) => {
    return {
      ...state,
      filters: state.filters.filter((item) => item.id !== id),
      loadingFilters: true,
    };
  }),
  on(FilterActions.updateFilter, (state, { filter }) => {
    const id = filter.id;

    return {
      ...state,
      filters: state.filters.map((item) => (item.id === id ? filter : item)),
      loadingFilters: true,
    };
  }),

  on(FilterActions.loadFiltersSuccess, (state, props) => ({
    ...state,
    loadingFilters: false,
    filters: props.filters,
  })),

  on(
    InstancesActions.loadInstancesOk,
    (state, { instances }): SettingsState => {
      return {
        ...state,
        instances,
      };
    }
  ),
  on(InstancesActions.saveInstanceTokenOk, (state, { id }): SettingsState => {
    const instances: Instance[] = JSON.parse(JSON.stringify(state.instances));

    instances.map((item) => {
      if (item.id === id) {
        item.added = true;
      }
      return item;
    });

    return {
      ...state,
      instances,
    };
  }),
  on(saveDefaultColumns, (state, { defaultColumns }) => ({
    ...state,
    profile: {
      ...state.profile,
      defaultColumns,
    },
  }))
);
