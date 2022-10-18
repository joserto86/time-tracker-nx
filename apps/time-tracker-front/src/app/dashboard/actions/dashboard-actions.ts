import { createAction, props } from '@ngrx/store';

export const loadInstances = createAction(
  '[Time Tracker] Load Instances'
);

export const loadInstancesSuccess = createAction(
  '[Time Tracker] Load Instances Success',
  props<{ instances: unknown }>()
);
