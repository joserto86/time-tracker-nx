import { createAction, props } from '@ngrx/store';
import { Instance, InstanceToken } from '@time-tracker/shared';

export const loadInstances = createAction('[Credentials Page] Load instances');

export const loadInstancesOk = createAction(
  '[Instances/API] Loaded instances Ok',
  props<{ instances: Instance[] }>()
);

export const saveInstanceToken = createAction(
  '[Credentials Page] Save instance token',
  props<{ token: InstanceToken }>()
);

export const saveInstanceTokenOk = createAction(
  '[Instances/API] Save instance token Ok',
  props<{ id: number }>()
);
