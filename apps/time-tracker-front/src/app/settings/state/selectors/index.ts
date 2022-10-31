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

export const selectFiltersState = createSelector(
  selectSettingsState,
  (state: fromSettings.State) => state.filters
);

export const selectFilter = (id: string) =>
  createSelector(selectFiltersState, (filters) =>
    filters.filter((item) => item.id === id)[0]
  );
