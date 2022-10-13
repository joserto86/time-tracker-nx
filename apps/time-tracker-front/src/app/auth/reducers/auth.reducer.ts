import {
    JwtResponse,
  } from '@time-tracker/shared';
  import { createReducer, on } from '@ngrx/store';
  import { AuthApiActions, AuthActions } from '../actions';
//   import jwt_decode from 'jwt-decode';
  
  export const statusFeatureKey = 'status';
  
  export interface State {
    jwt?: {
      response: JwtResponse | null;
      user: string | null;
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
        // user: jwt_decode<PublicUser>(jwt.token, { header: false }),
        user: jwt.token,
      },
    })),
    on(AuthActions.refreshToken, (state) => ({
      ...state,
      jwt: initialState.jwt,
    })),
    on(AuthActions.logout, (state) => ({
      ...state,
      jwt: initialState.jwt,
    })),
  );
  
  export const getUser = (state: State) => state.jwt?.user;
  export const getJwt = (state: State) => state.jwt?.response;
//   export const getSapUUID = (state: State) => state.sap?.uuid;
//   export const getSapToken = (state: State) => state.sap?.token;
//   export const getSapCreationDate = (state: State) => state.sap?.creationDate;
  