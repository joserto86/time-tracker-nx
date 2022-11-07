import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSettings from '../reducers';

export const selectSettingsState = createFeatureSelector<fromSettings.State>(
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
  createSelector(
    selectFiltersState,
    (filters) => filters.filter((item) => item.id === id)[0]
  );

export const selectInstances = createSelector(
  selectSettingsState,
  (state: fromSettings.State) => state.instances
);
