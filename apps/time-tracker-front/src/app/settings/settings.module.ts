import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MyFiltersPageComponent } from './pages/my-filters-page/my-filters-page.component';
import { CredentialsPageComponent } from './pages/credentials-page/credentials-page.component';


@NgModule({
  declarations: [
    ProfilePageComponent,
    MyFiltersPageComponent,
    CredentialsPageComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
