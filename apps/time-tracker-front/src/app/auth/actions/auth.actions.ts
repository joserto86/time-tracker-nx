import { createAction, props } from '@ngrx/store';

export const refreshToken = createAction('[Auth/Api] RefreshJwt');

export const logout = createAction('[Auth] Logout');
export const logoutConfirmation = createAction('[Auth] Logout Confirmation');
export const logoutConfirmationDismiss = createAction(
  '[Auth] Logout Confirmation Dismiss'
);

// export const checkSAPUUID = createAction(
//   '[Auth] check SAPToken',
//   props<{ uuid?: string }>()
// );

// export const setSAPToken = createAction(
//   '[Auth] set SAP Token',
//   props<{ token: string; creationDate: number }>()
// );

// export const invalidateSAPToken = createAction(
//   '[Auth] Invalidate SAP Token',
//   props<{ noredirect?: boolean }>()
// );
