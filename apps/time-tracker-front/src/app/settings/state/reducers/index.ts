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
      namespace: true,
      name: true,
      milestone: true,
      issue: true,
      label: true,
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
  }),
  on(InstancesActions.saveInstanceTokenOk, (state, { id, username }): State => {
    const instances: Instance[] = JSON.parse(JSON.stringify(state.instances));

    instances.map((item) => {
      if (item.id === id) {
        item.added = true;
        if (username) {
          item.username = username;
        }
      }
      return item;
    });

    return {
      ...state,
      instances,
    };
  })
);
