import { createReducer, on } from '@ngrx/store';
import { Columns, Filter, Instance, Profile } from '@time-tracker/shared';
import { saveDefaultColumns } from '../../../dashboard/state/actions/dashboard-actions';

import { FilterActions, InstancesActions, ProfileActions } from '../actions';

export const settingsFeaturedKey = 'settings';

export interface SettingsState {
  profile: Profile;
  filters: Filter[];
  instances: Instance[];
  loading: boolean
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
  loading: false
};

export const reducer = createReducer(
  initialState,

  on(ProfileActions.saveProfile, (state, { profile }) => {
    return {
      ...state,
      profile,
    };
  }),
  on(FilterActions.createFilter, (state, { filter }) => {
    return {
      ...state,
      filters: [...state.filters, filter],
      loading:true
    };
  }),
  on(FilterActions.deleteFilter, (state, { id }) => {
    return {
      ...state,
      filters: state.filters.filter((item) => item.id !== id),
      loading:true
    };
  }),
  on(FilterActions.updateFilter, (state, { filter }) => {
    const id = filter.id;

    return {
      ...state,
      filters: state.filters.map((item) => (item.id === id ? filter : item)),
      loading:true
    };
  }),
  on(FilterActions.saveFiltersSuccess, (state) => {
    return {
      ...state,
      loading: false
    };
  }),


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
  })),

  on(FilterActions.loadFilters, (state) => ({
    ...state,
    loading: true
  })),

  on(FilterActions.loadFiltersSuccess, (state, props) => ({
    ...state,
    loading: false,
    filters: props.filters
  }))

)
