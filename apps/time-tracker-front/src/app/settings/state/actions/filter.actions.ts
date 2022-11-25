import { createAction, props } from '@ngrx/store';
import { Filter } from '@time-tracker/shared';

export const createFilter = createAction(
  '[Filters Page] Create filter',
  props<{ filter: Filter }>()
);

export const deleteFilter = createAction(
  '[Filters Page] Delete filter',
  props<{ id: string }>()
);

export const updateFilter = createAction(
  '[Filters Page] Update filter',
  props<{ filter: Filter }>()
);

export const loadFilters = createAction(
  '[Filters] Load Filters'
);

export const loadFiltersSuccess = createAction(
  '[Filters] Load Filters Success',
  props<{ filters: Filter[] }>()
);

export const loadFiltersFailure = createAction(
  '[Filters] Load Filters Failure'
);

export const saveFiltersSuccess = createAction(
  '[Filters] Save Filters Success'
)

export const saveFiltersFailure = createAction(
  '[Filters] Save Filters Failure'
)
