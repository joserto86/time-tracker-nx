import { createAction, props } from '@ngrx/store';
import { Instance } from '@time-tracker/shared';

export const loadInstances = createAction(
  '[Credentials Page] Load instances',
);

export const loadInstancesOk = createAction(
  '[Instances/API] Loaded instances Ok',
  props<{ instances: Instance[] | unknown }>()
);