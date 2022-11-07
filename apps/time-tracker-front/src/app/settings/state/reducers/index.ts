import { createReducer, on } from '@ngrx/store';
import { Filter, Instance, Profile } from '@time-tracker/shared';

import { FilterActions, InstancesActions, ProfileActions } from '../actions';

export const settingsFeaturedKey = 'settings';

export interface State {
  profile: Profile;
  filters: Filter[];
  instances: Instance[];
}

export const initialState: State = {
  profile: {
    defaultView: 'monthly',
    defaultColumns: {
      namespace: false,
      name: false,
      milestone: false,
      issue: false,
      label: false,
    },
  },
  filters: [],
  instances: [],
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
    };
  }),
  on(FilterActions.deleteFilter, (state, { id }) => {
    return {
      ...state,
      filters: state.filters.filter((item) => item.id !== id),
    };
  }),
  on(FilterActions.updateFilter, (state, { filter }) => {
    const id = filter.id;

    return {
      ...state,
      filters: state.filters.map((item) => (item.id === id ? filter : item)),
    };
  }),
  on(InstancesActions.loadInstancesOk, (state, { instances }): State => {
    return {
      ...state,
      instances,
    };
  })
);
