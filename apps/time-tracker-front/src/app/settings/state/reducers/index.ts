import { createReducer, on } from '@ngrx/store';
import { Columns } from '@time-tracker/shared';

import * as fromSettings from '../actions/index';

export const settingsFeaturedKey = 'settings';

export interface State {
  profile: {
    defaultView: string;
    defaultColumns: Columns;
  };
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
};

export const reducer = createReducer(
  initialState,

  on(fromSettings.ProfileActions.saveProfile, (state, { profile }) => {
    return {
      ...state,
      profile,
    };
  })
);
