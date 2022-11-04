import { createAction, props } from '@ngrx/store';
import { ApiFilter, TimeNote } from '@time-tracker/shared';

export const loadTimeNotes = createAction(
  '[Time Tracker] Load Time Notes',
  props<{ filters: ApiFilter[] }>()
);

export const loadTimeNotesSuccess = createAction(
  '[Time Tracker] Load Time Notes Success',
  props<{ timeNotes: TimeNote[] }>()
);

export const loadTimeNotesFailure = createAction(
  '[Time Tracker] Load Time Notes Failure',
  props<{ error: string }>()
);
