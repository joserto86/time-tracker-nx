import { createAction, props } from '@ngrx/store';
import { Profile } from '@time-tracker/shared';


export const saveProfile = createAction(
  '[Profile Page] Save profile',
  props<{ profile: Profile }>()
);
