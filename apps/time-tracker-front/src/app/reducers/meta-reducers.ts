/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionReducer, MetaReducer, Action } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';

import { authFeatureKey, statusFeatureKey } from '../auth/reducers';
export function metaReducersFactory(): MetaReducer<unknown, Action>[] {
  const loggerMeta =
    (reducer: ActionReducer<unknown>) => (state: unknown, action: Action) => {
      const result = reducer(state, action);
      console.groupCollapsed(
        `%c👉 ${action.type}`,
        'font-size:0.8em; color: #666;'
      );
      console.log('prev state', state);
      console.log('action', action);
      console.log('next state', JSON.parse(JSON.stringify(result, null, 2))); // prevent mutations
      console.groupEnd();
      return result;
    };

  const localStorageSyncReducer = (reducer: ActionReducer<unknown>) =>
    localStorageSync({
      rehydrate: true,
      storageKeySerializer: (key) => `FAGOR_LICENSES_${key}`,
      keys: [{[`${authFeatureKey}`]: [statusFeatureKey] }],
      
    })(reducer);

  return !environment.production
    ? [loggerMeta, localStorageSyncReducer]
    : [localStorageSyncReducer];
}
