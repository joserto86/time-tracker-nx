import { JwtResponse } from '@time-tracker/shared';
import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ jwt: JwtResponse }>()
);

export const setUser = createAction(
  '[Auth/API] Set User',
  props<{ jwt: JwtResponse }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: string }>()
);

export const loginRedirect = createAction('[Auth/API] Login Redirect');
