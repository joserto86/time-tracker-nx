import { createReducer, on } from '@ngrx/store';
import { Columns, Filter } from '@time-tracker/shared';

import * as fromSettings from '../actions/index';

export const settingsFeaturedKey = 'settings';

export interface State {
  profile: {
    defaultView: string;
    defaultColumns: Columns;
  };
  filters: Filter[];
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
};

export const reducer = createReducer(
  initialState,

  on(fromSettings.ProfileActions.saveProfile, (state, { profile }) => {
    return {
      ...state,
      profile,
    };
  }),
  on(fromSettings.FilterActions.createFilter, (state, { filter }) => {
    return {
      ...state,
      filters: [...state.filters, filter],
    };
  }),
  on(fromSettings.FilterActions.deleteFilter, (state, { id }) => {
    return {
      ...state,
      filters: state.filters.filter((item) => item.id !== id),
    };
  }),
  on(fromSettings.FilterActions.updateFilter, (state, { filter }) => {
    const id = filter.id;

    return {
      ...state,
      filters: state.filters.map((item) => (item.id === id ? filter : item)),
    };
  })
);
