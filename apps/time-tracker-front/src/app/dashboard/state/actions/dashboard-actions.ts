import { createAction, props } from '@ngrx/store';
import { ApiFilter, Columns, TimeNote } from '@time-tracker/shared';

export const loadTimeNotes = createAction(
  '[Time Tracker Dashboard] Load Time Notes'
);

export const setDateFilters = createAction(
  '[Time Tracker Dashboard] Set Date Filters',
  props<{ filters: ApiFilter[] }>()
)

export const removeDateFilters = createAction(
  '[Time Tracker Dashboard] Remove Date Filters',
)

export const setSearchFilters = createAction(
  '[Time Tracker Dashboard] Set Search Filters',
  props<{ filters: ApiFilter[] }>()
)

export const removeSearchFilters = createAction(
  '[Time Tracker Dashboard] Remove Search Filters'
)

export const loadTimeNotesSuccess = createAction(
  '[Time Tracker Dashboard] Load Time Notes Success',
  props<{ timeNotes: TimeNote[], daysRange: string[] }>()
);

export const loadTimeNotesFailure = createAction(
  '[Time Tracker Dashboard] Load Time Notes Failure',
  props<{ error: string }>()
);

export const saveDefaultColumns = createAction(
  '[Dashboard page] Save default columns',
  props<{ defaultColumns: Columns }>()
);
