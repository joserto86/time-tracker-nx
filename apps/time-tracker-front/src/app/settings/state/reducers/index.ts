import { createReducer, on } from '@ngrx/store';
import { Columns, DefaultView } from '@time-tracker/shared';

import * as fromSettings from '../actions/index';

export const featuredKey = 'settings';

export interface State {
  profile: {
    defaultView: DefaultView;
    defaultColumns: Columns;
  };
}

export const initialState: State = {
  profile: {
    defaultView: { label: 'Monthlyyyy', value: 'monthly' },
    defaultColumns: {
      namespace: false,
      name: false,
      milestone: false,
      issue: false,
      label: false,
    },
  },
};

export const reducer = createReducer(
  initialState,

  on(fromSettings.ProfileActions.saveprofile, (state, { profile }) => {
    return {
      ...state,
      profile,
    };
  })
);
