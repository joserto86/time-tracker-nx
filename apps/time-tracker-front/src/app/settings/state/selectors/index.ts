import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from '@time-tracker/shared';

import * as fromSettings from '../reducers';

export const selectSettingsState = createFeatureSelector<SettingsState>(
  fromSettings.settingsFeaturedKey
);

export const selectProfileState = createSelector(
  selectSettingsState,
  (state: fromSettings.State) => state.profile
);
