import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';

export const authFeatureKey = 'auth';
export const statusFeatureKey = fromAuth.statusFeatureKey;
export interface AuthState {
  [fromAuth.statusFeatureKey]: fromAuth.State;
  [fromLoginPage.loginPageFeatureKey]: fromLoginPage.State;
}

export interface State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromAuth.statusFeatureKey]: fromAuth.reducer,
    [fromLoginPage.loginPageFeatureKey]: fromLoginPage.reducer,
  })(state, action);
}

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state) => state[fromAuth.statusFeatureKey]
);
export const selectUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);

export const selectJwt = createSelector(selectAuthStatusState, fromAuth.getJwt);

export const selectJwtToken = createSelector(selectJwt, (jwt) => jwt?.token);
export const selectJwtRefreshToken = createSelector(
  selectJwt,
  (jwt) => jwt?.refreshToken
);

export const selectLoggedIn = createSelector(selectJwt, (jwt) => {
  const isJwt = !!jwt;

  return {
    loggedIn: isJwt,
    isJwt,
  };
});

export const selectCurrentAuthorizationToken = createSelector(
  selectLoggedIn,
  selectJwtToken,
  ({ loggedIn }, jwt) => {
    if (loggedIn) {
      // return `Bearer ${jwt}`;
      return `${jwt}`;
    } else {
      return null;
    }
  }
);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state) => state.loginPage
);
export const selectLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);
export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
