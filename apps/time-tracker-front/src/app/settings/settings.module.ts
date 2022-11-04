import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { MaterialModule } from '../material/material.module';

import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MyFiltersPageComponent } from './pages/my-filters-page/my-filters-page.component';
import { CredentialsPageComponent } from './pages/credentials-page/credentials-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { StoreModule } from '@ngrx/store';

import * as fromSettings from './state/reducers';
import { FilterTableComponent } from './components/filter-table/filter-table.component';
import { NewFilterDialogComponent } from './components/new-filter-dialog/new-filter-dialog.component';
import { UpdateFilterDialogComponent } from './components/update-filter-dialog/update-filter-dialog.component';
import { InstanceTableComponent } from './components/instance-table/instance-table.component';
import { EffectsModule } from '@ngrx/effects';
import { InstancesEffects } from './state/effects/instances.effects';

@NgModule({
  declarations: [
    ProfilePageComponent,
    MyFiltersPageComponent,
    CredentialsPageComponent,
    ProfileFormComponent,
    FilterTableComponent,
    NewFilterDialogComponent,
    UpdateFilterDialogComponent,
    InstanceTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    MaterialModule,
    StoreModule.forFeature(
      fromSettings.settingsFeaturedKey,
      fromSettings.reducer
    ),
    EffectsModule.forFeature([InstancesEffects]),
  ],
})
export class SettingsModule {}
