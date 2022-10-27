import { JwtResponse, PublicUser } from '@time-tracker/shared';
import { createReducer, on } from '@ngrx/store';
import { AuthApiActions, AuthActions } from '../actions';
import jwt_decode from 'jwt-decode';

export const statusFeatureKey = 'status';

export interface State {
  jwt?: {
    response: JwtResponse | null;
    user: PublicUser | null;
  };
}

export const initialState: State = {
  jwt: {
    response: null,
    user: null,
  },
};

export const reducer = createReducer(
  initialState,

  on(AuthApiActions.setUser, (state, { jwt }) => ({
    ...state,
    jwt: {
      response: jwt,
      user: jwt_decode<PublicUser>(jwt.token, { header: false }),
    },
  })),
  on(AuthActions.refreshToken, (state) => {
    if (state.jwt?.response?.token) {
      return {
        ...state,
        jwt: {
          ...state.jwt,
          response: {
          ...state.jwt.response,
          token: '',
          }
        }
      };
    } else {
      return state;
    }
  }),
  on(AuthActions.logout, (state) => ({
    ...state,
    jwt: initialState.jwt,
  }))
);

export const getUser = (state: State) => state.jwt?.user;
export const getJwt = (state: State) => state.jwt?.response;
//   export const getSapUUID = (state: State) => state.sap?.uuid;
//   export const getSapToken = (state: State) => state.sap?.token;
//   export const getSapCreationDate = (state: State) => state.sap?.creationDate;
