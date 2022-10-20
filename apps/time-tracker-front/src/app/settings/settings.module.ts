import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { MaterialModule } from '../material/material.module';

import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MyFiltersPageComponent } from './pages/my-filters-page/my-filters-page.component';
import { CredentialsPageComponent } from './pages/credentials-page/credentials-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';


@NgModule({
  declarations: [
    ProfilePageComponent,
    MyFiltersPageComponent,
    CredentialsPageComponent,
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    MaterialModule
  ]
})
export class SettingsModule { }
