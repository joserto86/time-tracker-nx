import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSettings from '../reducers';
import { SettingsState } from '../reducers/index';

export const selectSettingsState = createFeatureSelector<SettingsState>(
  fromSettings.settingsFeaturedKey
);

export const selectProfileState = createSelector(
  selectSettingsState,
  (state: SettingsState) => state.profile
);

export const selectDefaultColumnsState = createSelector(
  selectSettingsState,
  (state: SettingsState) => state.profile.defaultColumns
);

export const selectFiltersState = createSelector(
  selectSettingsState,
  (state: SettingsState) => state.filters
);

export const selectFilter = (id: string) =>
  createSelector(
    selectFiltersState,
    (filters) => filters.filter((item) => item.id === id)[0]
  );

export const selectInstances = createSelector(
  selectSettingsState,
  (state: SettingsState) => state.instances
);
