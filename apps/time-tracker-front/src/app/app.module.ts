import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment'; // Angular CLI environment
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromAuth from './auth/reducers';
import { settingsFeaturedKey } from './settings/state/reducers';

export const authFeatureKey = 'auth';
export const statusFeatureKey = fromAuth.statusFeatureKey;

export function localStorageSyncReducer(
  reducer: ActionReducer<unknown>
): ActionReducer<unknown> {
  return localStorageSync({
    keys: [
      { [`${authFeatureKey}`]: [statusFeatureKey] },
      { [`${settingsFeaturedKey}`]: ['profile'] },
    ],
    rehydrate: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(
      reducers,
      { metaReducers } //, {
      // runtimeChecks: {
      // strictActionImmutability: true,
      // strictStateImmutability: true
      // }
      // }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    AuthModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
