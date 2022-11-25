import { createAction, props } from '@ngrx/store';
import { Profile } from '@time-tracker/shared';


export const saveProfile = createAction(
  '[Profile Page] Save profile',
  props<{ profile: Profile }>()
);

export const saveProfileSuccess = createAction(
  '[Profile Page] Save profile Success'
);

export const saveProfileFailure = createAction(
  '[Profile Page] Save profile Failure'
);

export const loadProfile = createAction(
  '[Profile Page] Load Profile',
);

export const loadProfileSuccess = createAction(
  '[Profile Page] Load Profile',
  props<{ profile: Profile }>()
);

export const loadProfileFailure = createAction(
  '[Profile Page] Load Profile Failure',
);
