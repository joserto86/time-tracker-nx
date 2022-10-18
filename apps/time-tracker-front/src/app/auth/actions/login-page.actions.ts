import { createAction, props } from "@ngrx/store";
import { JwtCredentials } from '@time-tracker/shared';

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: JwtCredentials }>()
);