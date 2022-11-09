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
